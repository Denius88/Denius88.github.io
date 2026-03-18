import React from 'react';

export default function Modal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{data.title}</h2>
        <p><strong>Дата:</strong> {data.date}</p>
        <p>{data.fullDesc}</p>
        <p><strong>Деталі:</strong> <br /> {data.details}</p>
      </div>
    </div>
  );
}
