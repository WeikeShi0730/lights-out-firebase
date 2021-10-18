import useEventListener from "./useEventListener";

const useClickOutside = (ref, cb) => {
  useEventListener(
    "click",
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) return;
      cb(e);
    },
    document
  );
};

export default useClickOutside;
