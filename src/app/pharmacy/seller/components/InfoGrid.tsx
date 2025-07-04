// components/InfoGrid.tsx
import InfoCard from './InfoCard'
import { infoItems } from './InfoItems';

export default function InfoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-12">
      {infoItems.map((item, idx) => (
        <InfoCard key={idx} {...item} />
      ))}
    </div>
  );
}
