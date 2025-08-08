"use client";
import { useRouter } from "next/navigation";

export const DeleteDocumentBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Tem certeza que deseja excluir este documento?');
    if (!confirmed) return;

    try {
      await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });
      router.refresh();
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500">
      Excluir Documento
    </button>
  );
};
