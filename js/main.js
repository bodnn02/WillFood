$(
  '.dar, .zakaz, a:contains(ЗАКАЗАТЬ СЕЙЧАС), [type=submit], .tn-elem[data-elem-id="1580812692934"], .tn-elem[data-elem-id="1622634781501"],.tn-elem[data-elem-id="1580806505250"],.tn-elem[data-elem-id="1580810413457"], .tn-elem[data-elem-id="1623426367364"], .tn-elem[data-elem-id="1623426338153"], .tn-elem[data-elem-id="1626085750146"], .tn-elem[data-elem-id="1630318632490"], .tn-elem[data-elem-id="1630174050802"], .tn-elem[data-elem-id="1580567583811"], .tn-elem[data-elem-id="1623571383101"], .tn-elem[data-elem-id="1623571260681"], .tn-elem[data-elem-id="1623571252984"], .tn-elem[data-elem-id="1623426384853"], .tn-elem[data-elem-id="1622568396623"], .tn-elem[data-elem-id="1580909182370"], .tn-elem[data-elem-id="1623571476633"],.tn-elem[data-elem-id="1623571312789"], .tn-elem[data-elem-id="1623570213986"]'
)
  .addClass("autoflash")
  .append(
    '<div class="flash lighting" style="height: 70px;width: 40px;top: 0px;left: -30px;"></div>'
  );

  let bodyOverflow = $('body').css('overflow');

  // Функция для блокировки прокрутки страницы
  function disableScroll() {
    $('body').css('overflow', 'hidden');
  }

  // Функция для разблокировки прокрутки страницы
  function enableScroll() {
    $('body').css('overflow', bodyOverflow);
  }

$(":not(.overlay-item)[data-overlay]").on("click", function (e) {
  attr = $(this).attr("data-overlay")

  $(".overlay").addClass("opened")
  $(".overlay-item[data-overlay=" + attr + "]").addClass("opened")
  disableScroll()
})

$(".overlay__close-btn").on("click", function (e) {
  $(this).parent().removeClass("opened")
  $(this).parent().parent().parent().removeClass("opened")
  enableScroll()
})

$(".answers-list__header").on("click", function (e) {
  $(this).parent().toggleClass("opened")
})

$(".answers-header__item").on("click", function (e) {
  attr = $(this).attr("data-link")

  $(this).parent().children(".answers-header__item").removeClass("selected")
  $(this).addClass("selected")

  $(".answers-content").children(".answers-list").hide()
  $(".answers-content").find(".answers-list[data-link=" + attr + "]").show()
})


$(".main-section__next").on("click", function (e) {
  gallery_list = $(this).parent().find(".main-gallery").children(".main-gallery__item")
  paggination_list = $(this).parent().find(".paggination-list").children(".paggination-list__item")

  current_index = $(this).parent().find(".paggination-list").find(".selected").index()
  length = $(paggination_list).length

  if(current_index + 1 == length) {
    $(gallery_list).removeClass("selected")
    $(gallery_list).eq(0).addClass("selected")

    $(paggination_list).removeClass("selected")
    $(paggination_list).eq(0).addClass("selected")
  } else {
    $(gallery_list).removeClass("selected")
    $(gallery_list).eq(current_index + 1).addClass("selected")

    $(paggination_list).removeClass("selected")
    $(paggination_list).eq(current_index + 1).addClass("selected")
  }
})

$(".main-section__prev").on("click", function (e) {
  gallery_list = $(this).parent().find(".main-gallery").children(".main-gallery__item")
  paggination_list = $(this).parent().find(".paggination-list").children(".paggination-list__item")

  current_index = $(this).parent().find(".paggination-list").find(".selected").index()
  length = $(paggination_list).length

  if(current_index - 1 < 0) {
    $(gallery_list).removeClass("selected")
    $(gallery_list).eq(length - 1).addClass("selected")

    $(paggination_list).removeClass("selected")
    $(paggination_list).eq(length - 1).addClass("selected")
  } else {
    $(gallery_list).removeClass("selected")
    $(gallery_list).eq(current_index - 1).addClass("selected")

    $(paggination_list).removeClass("selected")
    $(paggination_list).eq(current_index - 1).addClass("selected")
  }
})

$(".paggination-list__item", ".paggination-list[data-list]").on("click", function (e) {
  attr = $(this).parent().attr("data-list")
  gallery_list = $("ul:not(.paggination-list)[data-list=" + attr + "]").children("li")
  paggination_list = $(this).parent().children(".paggination-list__item")

  index = $(this).index()

  $(gallery_list).removeClass("selected")
  $(paggination_list).removeClass("selected")

  $(gallery_list).eq(index).addClass("selected")
  $(paggination_list).eq(index).addClass("selected")
})

$(".discount-tabs__item").on("click", function (e) {
  attr = $(this).attr("data-discount")
  tabs = $(this).parent().children(".discount-tabs__item")
  content_items = $(this).parent().parent().find(".discount-content")

  $(tabs).removeClass("selected")
  $(this).addClass("selected")

  $(content_items).children(".discount-content__item").removeClass("selected")
  $(content_items).children("[data-discount=" + attr + "]").addClass("selected")
})

/* Stories code *Start* */

$(".stories-list__item").on("click", function (e) {
  story_id = $(this).attr("data-story")
  story = $(".story[data-story="+story_id+"]")

  $(this).addClass("checked")
  $(".overlay").addClass("opened")
  $(".stories-overlay").addClass("opened")
  $(".story[data-story="+story_id+"]").addClass("current")

  $('body').css('overflow', 'hidden');
  $(".header").removeClass("scrolled")

  story_paggination = $(story).find(".story-paggination")
  story_content = $(story).find(".story-content__list")

  $(story_paggination).children().first().addClass("current")
  $(story_content).children().first().addClass("current")
  $(story_content).children().first().children("video")[0].play()
  storyUpdate()
});
$(".stories-overlay__close").on("click", function (e) {
  closeStory()
});
$(".stories-overlay__next").on("click", function (e) {
  nextStory()
});

$(".stories-overlay__prev").on("click", function (e) {
  prevStory()
});

var storyUpdate = function(e) {
  $(".story-content__item.current > video").on('timeupdate', function() {
    var currentTime = $(this)[0].currentTime
    var duration = $(this)[0].duration
  
    var percent = (currentTime / duration) * 100;

    if(percent == 100) {
      nextStory()
    }
  
    $(".story-paggination__item.current").children(".story-paggination__progress").width(percent + '%');
  });
}

var nextStory = function(e) {
  current_story = $(".story.current")
  current_index = $(".story-paggination__item.current").index()

  story_paggination = $(current_story).find(".story-paggination").children(".story-paggination__item")
  story_content = $(current_story).find(".story-content__list").children(".story-content__item")

  story_paggination.removeClass("current")
  story_content.removeClass("current")

  if(current_index + 1 == story_paggination.length) {
    closeStory()
  } else {
    story_paggination.eq(current_index ).addClass("checked")

    story_content.eq(current_index).children("video")[0].pause()
    story_content.eq(current_index).children("video").off("timeupdate")

    story_paggination.eq(current_index + 1).addClass("current")
    story_content.eq(current_index + 1).addClass("current")
    story_content.eq(current_index + 1).children("video")[0].play()
    storyUpdate()
  }
}

var prevStory = function(e) {
  current_story = $(".story.current")
  current_index = $(".story-paggination__item.current").index()

  story_paggination = $(current_story).find(".story-paggination").children(".story-paggination__item")
  story_content = $(current_story).find(".story-content__list").children(".story-content__item")

  story_paggination.removeClass("current")
  story_content.removeClass("current")

  if(current_index - 1 < 0) {
    closeStory()
  } else {
    $(".story.current video").each(function() {
      this.currentTime = 0;
    });
    story_paggination.eq(current_index - 1).removeClass("checked")

    story_paggination.eq(current_index).children(".story-paggination__progress").css("width","0%")

    story_content.eq(current_index).children("video")[0].pause()
    story_content.eq(current_index).children("video").off("timeupdate")

    story_paggination.eq(current_index - 1).addClass("current")
    story_content.eq(current_index - 1).addClass("current")
    story_content.eq(current_index - 1).children("video")[0].play()
    storyUpdate()
  }
}

var closeStory = function(e) { 
  $(".overlay").removeClass("opened")
  $(".stories-overlay").removeClass("opened")

  $(".story.current video").off("timeupdate")

  $(".story.current video").each(function() {
    this.pause()
  });

  $(".story.current video").each(function() {
    this.currentTime = 0;
  });

  $(".story.current .story-paggination__progress").css("width","0%")
  $('body').css('overflow', 'visible');

  $(".story.current").removeClass("current")
  $(".story .current").removeClass('current');
  $(".story .checked").removeClass("checked")
}

$(".play-btn").on("click", function(e) {
  storyPause()
});

$(".mute-btn").on("click", function(e) {
  video = $(".story-content__item.current > video")

  $('video').volume(0.5);

  if($(video).volume() == 0) {
    $(this).addClass("sound-btn")

    $(video)[0].volume(0);
  } else {
    $(this).removeClass("sound-btn")
    
    $(video)[0].volume(1);
  }
});
var storyPause = function(e) {
  video = $(".story-content__item.current > video")

  if($(video).get(0).paused === false) {
    $(".play-btn").addClass("pause-btn")

    $(video)[0].pause()
  } else {
    $(".play-btn").removeClass("pause-btn")
    $(video)[0].play()
  }
}
$(".story-content__item").on("click", function(e) {
  storyPause()
})
$(".story").swipe( {
  swipeLeft:function(event, direction, distance, duration) {
    nextStory()
  },
  swipeRight:function(event, direction, distance, duration) {
    prevStory()
  },
  threshold:100,
  allowPageScroll:"vertical"
});

$(".quiz-list__item").on("click", function(e) {
  $(this).parent().children(".quiz-list__item").removeClass("selected")

  $(this).addClass("selected")
})

/* Stories code *Stop* */



/* Calculator code *Start* */

$(".kkal-list__item").on("click", function(e) {
  $(this).parent().children(".kkal-list__item").removeClass("selected")
  $(this).addClass("selected")
})

$(".duration-list__item").on("click", function(e) {
  $(this).parent().children(".duration-list__item").removeClass("selected")
  $(this).addClass("selected")
})

$(".schelude-kkal__item").on("click", function(e) {
  $(this).parent().children(".schelude-kkal__item").removeClass("selected")
  $(this).addClass("selected")
})

$(".schelude-days__item").on("click", function(e) {
  $(this).parent().children(".schelude-days__item").removeClass("selected")
  $(this).addClass("selected")
})

/* Calculator code *Stop* */