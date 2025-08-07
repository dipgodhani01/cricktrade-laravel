import { backBtn, resBtn, soldBtn, unsoldBtn } from "../../../helper/style";

function AuctionActions({ onReset, onBack, onSold, onUnsold }) {
  return (
    <div className="mt-10 md:text-xl text-lg tracking-wider font-medium flex flex-wrap gap-4 justify-center md:justify-start">
      <button onClick={onReset} className={resBtn}>
        Reset Bid
      </button>
      <button onClick={onBack} className={backBtn}>
        Back
      </button>
      <button onClick={onSold} className={soldBtn}>
        Sold
      </button>
      <button onClick={onUnsold} className={unsoldBtn}>
        Unsold
      </button>
    </div>
  );
}

export default AuctionActions;
