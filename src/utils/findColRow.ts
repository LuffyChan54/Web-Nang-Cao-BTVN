import ColRow from "@/types/ColRow";
const findColRow = (index: number): ColRow => {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return { col, row };
};

export default findColRow;
