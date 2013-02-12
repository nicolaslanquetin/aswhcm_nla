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
    
    getViewerBlog(function(response) {
        var blog = response.viewerBlog;
        var blogName = document.getElementById('blog_name');
        blogName.innerHTML = 'Blog: ' + blog.name
      });

    var workLocationSpan = document.getElementById('workLocationSpan'),
        prefs = new gadgets.Prefs(),
        yourWorkLocation = prefs.getString("work_location");
        workLocationSpan.innerHTML = yourWorkLocation;

  }

  function postActivity(){
    var params = {activity: {title:"Hello Jive!", body:"Posting to the stream is easy!"}};
     osapi.activities.create(params).execute(postActivityCallback);
  }

  function postActivityCallback(){
    var msg = new gadgets.MiniMessage(__MODULE_ID__);
	msg.createDismissibleMessage("You just posted an activity!");
	gadgets.window.adjustHeight();
  }
  
  function getViewerBlog(callback) {
      osapi.jive.core.users.get({id: '@viewer'}).execute(function(userResponse) {
        if(!userResponse.error) {
          var user = userResponse.data;
          user.blog.get().execute(function(blogResponse) {
            if(!blogResponse.error) {
              var blog = blogResponse.data;
              callback({viewerBlog: blog});
            } else {
              alert(blogResponse.error.message);
            }
          });
        }
      });
    }

  postBlogPost = function() {
    getViewerBlog(function(response) {
      var blog = response.viewerBlog;
      var subject = document.getElementById('blog_subject').value;
      var html = document.getElementById('blog_content').value;
      var blogEntry = {subject: subject, html: html};
      var blogPostRequest = blog.posts.create(blogEntry);
      blogPostRequest.execute(function(blogpostResponse) {
        if(!blogpostResponse.error) {
          alert("Yay! Posted.");
        } else {
          alert(blogpostResponse.error.message);
        }
      });
    });
    return false;
  };


  gadgets.util.registerOnLoadHandler(init);
  