import React, { useRef, useState } from 'react';
import { burgers, combos, snacks, sauces } from '@/data/menu.json';

export default function ConfirmOrderDialog({
  isOpen,
  onClose,
  order,
}: {
  isOpen: boolean;
  onClose: () => void;
  order: { [id: number]: number };
}) {
  const [name, setName] = useState('');

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleClose() {
    onClose();
  }

  function handleConfirm() {
    let message = `Замовлення від: ${name} \n\n`;
    Object.entries(order).forEach(([productId, count]) => {
      const product = getProductById(+productId);
      if (product) {
        message += `${product.name} ${product.weight} : ${count} шт. \n`;
      }
    });
    message += '\n До сплати: ' + sum + ' грн';

    fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message }),
    })
      .then((res) => res.json())
      .then(() => {
        onClose();
        alert('Готово, все ок!');
      })
      .catch((err) => console.error('Помилка:', err));
  }

  const dialogRef = useRef<HTMLDialogElement>(null);

  if (isOpen) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
  }

  let sum = 0;

  return (
    <dialog ref={dialogRef} className="p-6">
      <input
        className="bg-transparent border-b border-b-gray-400 focus:outline-none w-full mb-3"
        type="text"
        placeholder="Імʼя"
        value={name}
        onChange={onNameChange}
      />
      {Object.entries(order).map(([productId, count]) => {
        const product = getProductById(+productId);
        sum += (product?.prices.gold ?? 0) * count;
        return (
          product && (
            <div
              className="py-1 flex flex-row justify-between min-w-64"
              key={productId}
            >
              <p className="text-left inline">
                {product.name}{' '}
                <span className="text-xs">{product?.weight ?? ''}</span>
              </p>
              <p className="text-right inline ml-6">{count}</p>
            </div>
          )
        );
      })}
      <div className="flex flex-row justify-between gap-4 mt-6">
        <p>До сплати:</p>
        <p>{sum} грн</p>
      </div>
      <div className="flex flex-row justify-between gap-4 mt-6">
        <button
          className="p-2 border shadow text-red-300 w-28"
          onClick={handleClose}
        >
          Скасувати
        </button>
        <button
          className="p-2 border shadow disabled:shadow-none disabled:text-gray-400 w-28 text-green-300 disabled:border-none disabled:bg-white"
          onClick={handleConfirm}
          disabled={name.length < 3}
        >
          Підтвердити
        </button>
      </div>
    </dialog>
  );
}

function getProductById(id: number) {
  const burger = burgers.find((product) => product.id === id);
  if (burger) {
    return burger;
  }

  const combo = combos.find((product) => product.id === id);
  if (combo) {
    return combo;
  }

  const snack = snacks.find((sauce) => sauce.id === id);
  if (snack) {
    return snack;
  }

  const sauce = sauces.find((sauce) => sauce.id === id);
  if (sauce) {
    return sauce;
  }

  return undefined;
}
