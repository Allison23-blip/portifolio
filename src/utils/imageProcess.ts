/**
 * Utility to process user-uploaded avatar images:
 * - Detects solid/near-white backgrounds and keys them out to transparent
 * - Crops tightly around non-transparent pixels so the head is nicely framed
 */
export function processAvatarImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(reader.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          // Check if image has solid white/near-white background
          // Sample corners to see if they are white
          const corners = [
            0, // top-left
            (canvas.width - 1) * 4, // top-right
            ((canvas.height - 1) * canvas.width) * 4, // bottom-left
            ((canvas.height - 1) * canvas.width + (canvas.width - 1)) * 4, // bottom-right
          ];
          const isCornerWhite = corners.every((idx) => {
            return data[idx] > 240 && data[idx + 1] > 240 && data[idx + 2] > 240;
          });

          let minX = canvas.width;
          let minY = canvas.height;
          let maxX = 0;
          let maxY = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a === 0) continue;

            // If corner is white, remove white background
            if (isCornerWhite) {
              const diff = Math.sqrt(
                Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2)
              );
              // Soft threshold for edge antialiasing
              if (diff < 20) {
                data[i + 3] = 0;
                continue;
              } else if (diff < 40) {
                data[i + 3] = Math.round(((diff - 20) / 20) * a);
              }
            }

            // Track bounding box of subject
            if (data[i + 3] > 20) {
              const pixelIdx = i / 4;
              const x = pixelIdx % canvas.width;
              const y = Math.floor(pixelIdx / canvas.width);
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }

          // If subject found, crop to bounding box with small padding
          if (maxX > minX && maxY > minY) {
            ctx.putImageData(imgData, 0, 0);

            const pad = 24;
            const cropX = Math.max(0, minX - pad);
            const cropY = Math.max(0, minY - pad);
            const cropW = Math.min(canvas.width - cropX, maxX - minX + pad * 2);
            const cropH = Math.min(canvas.height - cropY, maxY - minY + pad * 2);

            const cropCanvas = document.createElement('canvas');
            cropCanvas.width = cropW;
            cropCanvas.height = cropH;
            const cropCtx = cropCanvas.getContext('2d');
            if (cropCtx) {
              cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
              resolve(cropCanvas.toDataURL('image/png'));
              return;
            }
          }

          ctx.putImageData(imgData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } catch (err) {
          resolve(reader.result as string);
        }
      };
      img.onerror = () => resolve(reader.result as string);
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
