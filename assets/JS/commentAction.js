function postComment(button, postedBy, videoId, replyTo, containerClass) {
    let textarea = $(button).siblings("textarea");
    let commentText = textarea.val();
    //Emptying textarea once btn is clicked
    textarea.val("");

    if (commentText) {
        $.post("ajax/postComment.php", {
                commentText: commentText,
                postedBy: postedBy,
                videoId: videoId,
                responseTo: replyTo
            })
            .done(function (comment) {
                $("." + containerClass).prepend(comment);
            });
    } else {
        alert("You can't post an empty comment");
    }
}


function toggleReply(button) {
    let parent = $(button).closest(".itemContainer");
    let commentForm = parent.find(".commentForm").first();

    commentForm.toggleClass("hidden");
}

function likeComment(commentId, button, videoId){
    $.post("ajax/likeComment.php",{commentId:commentId ,videoId:videoId})
    .done(function(data){
       
       let likeButton = $(button);
       let disLikeButton = $(button).siblings(".disLikeButton");

       likeButton.addClass("active");
       disLikeButton.removeClass("active");
       
       let result = JSON.parse(data);
        console.log(result);
       
       updateLikeValue(likeButton.find(".text"), result.likes)
       updateLikeValue(disLikeButton.find(".text"), result.disLikes)
       
       if(result.likes < 0){
           likeButton.removeClass("active");
           likeButton.find("img:first").attr("src","assets/images/icons/thumb-up.png");
       }else{
           likeButton.find("img:first").attr("src","assets/images/icons/thumb-up-active.png");
       }
        disLikeButton.find("img:first").attr("src","assets/images/icons/thumb-down.png");

    });
}

function disLikeComment(commentId, button, videoId){
    $.post("ajax/disLikeComment.php",{commentId:commentId, videoId:videoId})
    .done(function(data){
       
       let disLikeButton = $(button);
       let likeButton = $(button).siblings(".likeButton");

       disLikeButton.addClass("active");
       likeButton.removeClass("active");
       
       let result = JSON.parse(data);
        console.log(result);
       
       updateLikeValue(likeButton.find(".text"), result.likes)
       updateLikeValue(disLikeButton.find(".text"), result.disLikes)
       
       if(result.disLikes < 0){
           disLikeButton.removeClass("active");
           disLikeButton.find("img:first").attr("src","assets/images/icons/thumb-down.png");
       }else{
           disLikeButton.find("img:first").attr("src","assets/images/icons/thumb-down-active.png");
       }
       likeButton.find("img:first").attr("src","assets/images/icons/thumb-up.png");

    });
}