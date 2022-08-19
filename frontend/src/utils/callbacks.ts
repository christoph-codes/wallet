import { useEffect } from 'react';
 /**
* Hook that alerts clicks outside of the passed ref
*/
export const useOutsideAlerter = (ref: any, callback: () => void) => {
 useEffect(() => {
   /**
	* Alert if clicked on outside of element
	*/
   const handleClickOutside = (event: Event) => {
	 if (ref.current && !ref.current.contains(event.target)) {
	   callback();
	 }
   }
   // Bind the event listener
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
	 // Unbind the event listener on clean up
	 document.removeEventListener("mousedown", handleClickOutside);
   };
 }, [ref, callback]);
}