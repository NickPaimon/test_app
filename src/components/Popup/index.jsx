import Success from "../../assets/success-image.svg";

function Popup({ show }) {
  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <img src={Success} alt="success" className="max-w-full h-auto" />
        </div>
      )}
    </>
  );
}

export default Popup;
