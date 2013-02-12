gadgets.util.registerOnLoadHandler(function() {
  // add code that should run on page load here
	osapi.people.getViewer().execute(function(viewerData) {
        if (!viewerData.error) {
           var viewerDiv = document.getElementById('current_user_id'),
               viewerThumbnailImg = document.getElementById('viewerThumbnailImg');
           viewerDiv.innerHTML += viewerData.displayName;
           viewerThumbnailImg.attributes.getNamedItem("src").nodeValue=viewerData.thumbnailUrl;
           gadgets.window.adjustHeight();
        };
     });

     osapi.people.getViewerFriends().execute(function(viewerFriends) {
        if (!viewerFriends.error){
         var resultDiv = document.getElementById('result');
         resultDiv.innerHTML = viewerFriends.list.length;
        }
     });

     var workLocationSpan = document.getElementById('workLocationSpan'),
         prefs = new gadgets.Prefs(),
         yourWorkLocation = prefs.getString("work_location");
         workLocationSpan.innerHTML = yourWorkLocation;
	
  // resize app window to fit content
  // gadgets.window.adjustHeight();
});
