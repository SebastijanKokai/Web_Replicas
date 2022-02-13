const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = "AIzaSyASUlmL1kMXJSSnU7oGCrKYZiFV7JG3r1E"; // 1 point for each search result, 10k points per day

const cardsContainer = document.querySelector(".cards-container");
const topicsBar = document.querySelector(".topics-bar");
const leftSide = document.getElementById("left-side");
const menu = document.getElementById("menu");
const userProfileIcon = document.getElementById("user-profile-icon");
const profileDetails = document.getElementById("profile-details");
const backdrop = document.getElementById("backdrop");

// Waiting to load libraries
window.onload = function () {
  createTopicBars();
  createCards(50);
};

menu.addEventListener("click", () => {
  leftSide.classList.toggle("active");
  if (profileDetails.classList.contains("active"))
    profileDetails.classList.remove("active");

  if (document.documentElement.clientWidth <= 1000)
    backdrop.classList.toggle("active");
});
userProfileIcon.addEventListener("click", () => {
  profileDetails.classList.toggle("active");
  if (leftSide.classList.contains("active")) {
    leftSide.classList.remove("active");
    backdrop.classList.remove("active");
  }
});

backdrop.addEventListener("click", () => {
  if (backdrop.classList.contains("active")) {
    backdrop.classList.remove("active");
    leftSide.classList.remove("active");
  }
});

const getTopicsInfo = async () => {
  const params = {
    params: {
      key: API_KEY,
      regionCode: "RS",
      part: "snippet",
    },
  };

  const response = await axios.get(YOUTUBE_API_URL + "videoCategories", params);
  const {
    data: { items },
  } = response;
  console.log(response);
  return items;
};

const createTopicBars = async () => {
  const items = await getTopicsInfo();

  items.forEach((item) => {
    let {
      snippet: { title },
    } = item;
    title = title.split(" ")[0].trim();

    const newTopicBar = document.createElement("button");
    newTopicBar.classList.add("topic-bar");
    newTopicBar.innerHTML = title;
    topicsBar.appendChild(newTopicBar);
  });
};

const getCardInfo = async (numberOfResults) => {
  const params = {
    params: {
      key: API_KEY,
      chart: "mostPopular",
      maxResults: numberOfResults,
      part: "snippet, contentDetails, statistics",
    },
  };

  const response = await axios.get(YOUTUBE_API_URL + "videos", params);
  const {
    data: { items },
  } = response;
  return items;
};

const createCards = async (numberOfCards) => {
  const items = await getCardInfo(numberOfCards);

  // Looping through each item to create a card element with Youtube API data in it
  items.forEach((item) => {
    // Extracting data
    let {
      contentDetails: { duration },
      snippet: { title, channelTitle, publishedAt, thumbnails },
      statistics: { viewCount },
    } = item;
    let {
      high: { url },
    } = thumbnails;

    // Formating data
    let { hours, minutes, seconds } = transformTime(duration);
    publishedAt = moment(publishedAt).fromNow();
    if (title.length >= 60) title = title.slice(0, 59) + " ...";

    // Creating card element and setting data in it
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
      <div class="card-image">
        <img
          src="${url}"
          alt="Card image"
        />
        <div class="card-length">
          <b>${formatVideoLength(hours, minutes, seconds)}</b>
        </div>
      </div>

      <div class="card-description">
        <div class="user-channel-image">
          <img
            src="${url}"
            alt="Channel image"
          />
        </div>
        <div class="card-info">
          <h4>${title}</h4>
          <small class="card-channel-name">${channelTitle}</small>
          <small>${formatViewCount(viewCount)} views · ${publishedAt} </small>
        </div>
      </div>
      `;
    cardsContainer.appendChild(newCard);
  });
};

const transformTime = (duration) => {
  let hours, minutes, seconds;

  if (duration.includes("H")) {
    hours = duration.substr(2, duration.indexOf("H") - 2);
    minutes = duration.substr(
      duration.indexOf("H") + 1,
      duration.indexOf("M") - 2
    );
    seconds = duration.substr(
      duration.indexOf("M") + 1,
      duration.indexOf("S") - 2
    );
  } else if (duration.includes("M")) {
    minutes = duration.substr(2, duration.indexOf("M") - 2);

    seconds = duration.substr(
      duration.indexOf("M") + 1,
      duration.indexOf("S") - 1
    );
  } else if (duration.includes("S")) {
    seconds = duration.substr(2, duration.indexOf("S") - 2);
  }
  minutes = minutes.padStart(2, "0");
  seconds = seconds.padStart(2, "0");
  return { hours, minutes, seconds };
};

const formatVideoLength = (hours, minutes, seconds) => {
  return hours
    ? hours + ":" + minutes + ":" + seconds
    : minutes
    ? minutes + ":" + seconds
    : seconds
    ? "0:" + seconds
    : "0s";
};

const formatViewCount = (viewCount) => {
  viewCount = parseFloat(viewCount);
  return viewCount / 1000000 > 1
    ? (viewCount / 1000000).toFixed(2) + "mil"
    : viewCount / 1000 > 1
    ? (viewCount / 1000).toFixed(2) + "k"
    : viewCount;
};
