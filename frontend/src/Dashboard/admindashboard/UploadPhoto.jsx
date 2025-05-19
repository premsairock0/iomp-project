import React, { useState } from 'react';
import axios from 'axios'; // make sure axios is installed

export default function UploadPhoto() {
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/photos', { url: imageUrl });

      if (response.status === 200 || response.status === 201) {
        setMessage('Photo uploaded successfully!');
        setImageUrl('');
      } else {
        setMessage('Upload failed. Try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        paddingTop: '60px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #ccc',
        }}
      >
        <h3 className="text-center mb-4">Upload Photo by URL</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label style={{ marginBottom: '10px', display: 'block', fontWeight: '500' }}>
              Image URL
            </label>
            <input
              type="url"
              className="form-control"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              style={{
                height: '50px',
                fontSize: '16px',
                padding: '10px 15px',
              }}
            />
          </div>

          {imageUrl && (
            <div className="text-center mb-4">
              <img
                src={imageUrl}
                alt="Preview"
                className="img-fluid rounded border"
                style={{ maxHeight: '250px', objectFit: 'contain' }}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              height: '50px',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Submit
          </button>

          {message && (
            <div className="mt-3 text-center">
              <small className="text-muted">{message}</small>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
