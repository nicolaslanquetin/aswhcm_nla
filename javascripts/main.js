  function init() {
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

  }

  function postActivity(){
    var params = {activity: {title:"Hello Jive!",
                          body:"Posting to the stream is easy!"}
              };
     osapi.activities.create(params).execute(myCallback);
  }

  function myCallback(){
    var msg = new gadgets.MiniMessage(__MODULE_ID__);
        msg.createDismissibleMessage("You just posted an activity!");
        gadgets.window.adjustHeight();
  }


  gadgets.util.registerOnLoadHandler(init);
      