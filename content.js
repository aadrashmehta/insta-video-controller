(() => {
  const PROCESSED_FLAG = "data-custom-controller-attached";

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const createController = (video) => {
    const wrapper = document.createElement("div");
    wrapper.className = "custom-video-controller";

    /* Time row */
    const timeRow = document.createElement("div");
    timeRow.className = "time-row";

    const currentTimeEl = document.createElement("span");
    currentTimeEl.textContent = "0:00";

    const durationEl = document.createElement("span");
    durationEl.textContent = "0:00";

    timeRow.append(currentTimeEl, durationEl);

    /* Control row */
    const controlRow = document.createElement("div");
    controlRow.className = "control-row";

    const muteBtn = document.createElement("button");

    const updateMuteState = () => {
      muteBtn.textContent = video.muted || video.volume === 0 ? "🔇" : "🔊";
    };

    muteBtn.onclick = () => {
      video.muted = !video.muted;
      updateMuteState();
    };

    updateMuteState();

    const progress = document.createElement("input");
    progress.type = "range";
    progress.min = 0;
    progress.value = 0;
    progress.step = 0.1;

    /* Video sync */
    video.addEventListener("loadedmetadata", () => {
      progress.max = video.duration;
      durationEl.textContent = formatTime(video.duration);
    });

    video.addEventListener("timeupdate", () => {
      if (!progress.matches(":active")) {
        progress.value = video.currentTime;
      }
      currentTimeEl.textContent = formatTime(video.currentTime);
    });

    video.addEventListener("volumechange", updateMuteState);

    progress.addEventListener("input", () => {
      video.currentTime = progress.value;
    });

    controlRow.append(muteBtn, progress);
    wrapper.append(timeRow, controlRow);

    return wrapper;
  };

  const processVideos = () => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
      if (video.hasAttribute(PROCESSED_FLAG)) return;

      const container = video.parentElement;
      if (!container) return;

      const instanceEl = container.querySelector("[data-instancekey]");
      if (!instanceEl) return;

      const ariaEl = instanceEl.querySelector(
        "[aria-valuemax], [aria-valuemin], [aria-valuenow]"
      );
      if (!ariaEl) return;

      const controller = createController(video);
      instanceEl.parentElement.insertBefore(controller, instanceEl);

      video.setAttribute(PROCESSED_FLAG, "true");
    });
  };

  processVideos();

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;

    setTimeout(() => {
      processVideos();
      scheduled = false;
    }, 400);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();



// (() => {
//   const PROCESSED_FLAG = "data-custom-controller-attached";

//   const formatTime = (time) => {
//     if (isNaN(time)) return "0:00";
//     const m = Math.floor(time / 60);
//     const s = Math.floor(time % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const createController = (video) => {
//     const wrapper = document.createElement("div");
//     wrapper.className = "custom-video-controller";

//     const timeRow = document.createElement("div");
//     timeRow.className = "time-row";

//     const currentTimeEl = document.createElement("span");
//     currentTimeEl.textContent = "0:00";

//     const durationEl = document.createElement("span");
//     durationEl.textContent = "0:00";

//     timeRow.append(currentTimeEl, durationEl);

//     const progress = document.createElement("input");
//     progress.type = "range";
//     progress.min = 0;
//     progress.value = 0;
//     progress.step = 0.1;

//     // Update duration when metadata is ready
//     video.addEventListener("loadedmetadata", () => {
//       progress.max = video.duration;
//       durationEl.textContent = formatTime(video.duration);
//     });

//     // Sync slider while video plays
//     video.addEventListener("timeupdate", () => {
//       if (!progress.matches(":active")) {
//         progress.value = video.currentTime;
//       }
//       currentTimeEl.textContent = formatTime(video.currentTime);
//     });

//     // Seek video when user drags slider
//     progress.addEventListener("input", () => {
//       video.currentTime = progress.value;
//     });

//     wrapper.append(timeRow, progress);
//     return wrapper;
//   };

//   const processVideos = () => {
//     const videos = document.querySelectorAll("video");

//     videos.forEach((video) => {
//       if (video.hasAttribute(PROCESSED_FLAG)) return;

//       const container = video.parentElement;
//       if (!container) return;

//       const instanceEl = container.querySelector("[data-instancekey]");
//       if (!instanceEl) return;

//       // Ensure required ARIA element exists inside
//       const ariaEl = instanceEl.querySelector(
//         "[aria-valuemax], [aria-valuemin], [aria-valuenow]"
//       );

//       if (!ariaEl) return;

//       const controller = createController(video);

//       // Insert controller before data-instancekey
//       instanceEl.parentElement.insertBefore(controller, instanceEl);

//       video.setAttribute(PROCESSED_FLAG, "true");
//     });
//   };

//   // Initial run
//   processVideos();

//   // Observe DOM changes
//   let scheduled = false;

//   const observer = new MutationObserver(() => {
//     if (scheduled) return;
//     scheduled = true;

//     setTimeout(() => {
//       processVideos();
//       scheduled = false;
//     }, 400);
//   });

//   observer.observe(document.documentElement, {
//     childList: true,
//     subtree: true
//   });
// })();
