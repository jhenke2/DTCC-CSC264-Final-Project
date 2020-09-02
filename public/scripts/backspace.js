
/*
   @author Trevor Wilkins
   JS file for controlling animation state of a text field.

   Animation is triggered when backspace is pressed on an empty text field.

*/

document.addEventListener("keydown", KeyCheck);  //or however you are calling your method


function KeyCheck(event)
{
   var el = $(':focus');
   
   var KeyID = event.keyCode;
   switch(KeyID)
   {
      case 8:
         if (el.val() == "") {
               
               if ($(':focus').attr("id") == 'search-bar') {
                  document.getElementById('search-box').classList.add('backspace');
                  document.getElementById('search-box').addEventListener('animationend', e=> {
                     document.getElementById('search-box').classList.remove('backspace');
                  });
               }
               else {
                  document.activeElement.classList.add("backspace");
               
                  document.activeElement.addEventListener("animationend", e => {
                     document.activeElement.classList.remove("backspace");
                  });
               }
         }
      break; 
      default:
      break;
   }
}

