function load(count = 10, offset = 0) {
    axios
      .get(
        `https://api.vk.com/method/wall.get?access_token=03cb6dbd03cb6dbd03cb6dbd6500dcb89b003cb03cb6dbd65c76084daee7883a34e38ca&owner_id=-ponarth&domain=ponarth&offset=${offset}&count=${count}&filter=all&v=5.199`
      )
      .then(({ data }) => {
        // Получаем массив постов
        const posts = data.response.items;
        console.log(posts);
        // Получаем контейнер для карусели
        const swiperWrapper = document.querySelector(
          ".mySwiper .swiper-wrapper"
        );

        // Создаем посты в карусели
        posts.forEach((post) => {
          // Создаем элемент карусели для поста
          const postItem = document.createElement("div");
          postItem.classList += "swiper-slide";

          // Получаем текст поста
          let text = post.text;

          // Создаем элемент <div> для изображения
          const imageDiv = document.createElement("div");
          imageDiv.style.width = "252px";
          imageDiv.style.height = "276px";
          imageDiv.style.borderRadius = "8px";
          imageDiv.style.backgroundPosition = "center center";
          imageDiv.style.backgroundSize = "cover";
          imageDiv.style.backgroundRepeat = "no-repeat";
          imageDiv.style.margin = "24px"; // Добавляем отступ снизу к изображению

          // Проверяем наличие копии поста
          if (post.copy_history && post.copy_history.length > 0) {
            // Если есть копия поста, используем текст из нее
            text = post.copy_history[0].text;
            // Проверяем наличие вложений в копии поста
            if (
              post.copy_history[0].attachments &&
              post.copy_history[0].attachments.length > 0 &&
              post.copy_history[0].attachments[0].photo &&
              post.copy_history[0].attachments[0].photo.sizes &&
              post.copy_history[0].attachments[0].photo.sizes[2] &&
              post.copy_history[0].attachments[0].photo.sizes[2].url
            ) {
              // Если есть вложения, добавляем первое изображение
              imageDiv.style.backgroundImage = `url(${post.copy_history[0].attachments[0].photo.sizes[2].url})`;
            } else if (
              post.copy_history[0].attachments &&
              post.copy_history[0].attachments.length > 0 &&
              post.copy_history[0].attachments[0].video &&
              post.copy_history[0].attachments[0].video.first_frame &&
              post.copy_history[0].attachments[0].video.first_frame[2] &&
              post.copy_history[0].attachments[0].video.first_frame[2].url
            ) {
              imageDiv.style.backgroundImage = `url(${post.copy_history[0].attachments[0].video.first_frame[2].url})`;
            } else if (
              post.copy_history[0].attachments &&
              post.copy_history[0].attachments.length > 0 &&
              post.copy_history[0].attachments[0].video &&
              post.copy_history[0].attachments[0].video.image &&
              post.copy_history[0].attachments[0].video.image[2] &&
              post.copy_history[0].attachments[0].video.image[2].url
            ) {
              imageDiv.style.backgroundImage = `url(${post.copy_history[0].attachments[0].video.image[2].url})`;
            }
          } else {
            // Проверяем наличие вложений в оригинальном посте
            if (
              post.attachments &&
              post.attachments.length > 0 &&
              post.attachments[0].photo &&
              post.attachments[0].photo.sizes &&
              post.attachments[0].photo.sizes[2] &&
              post.attachments[0].photo.sizes[2].url
            ) {
              // Если есть вложения, добавляем первое изображение
              imageDiv.style.backgroundImage = `url(${post.attachments[0].photo.sizes[2].url})`;
            } else if (
              post.attachments &&
              post.attachments.length > 0 &&
              post.attachments[0].video &&
              post.attachments[0].video.first_frame &&
              post.attachments[0].video.first_frame[2] &&
              post.attachments[0].video.first_frame[2].url
            ) {
              imageDiv.style.backgroundImage = `url(${post.attachments[0].video.first_frame[2].url})`;
            } else if (
              post.attachments &&
              post.attachments.length > 0 &&
              post.attachments[0].video &&
              post.attachments[0].video.image &&
              post.attachments[0].video.image[2] &&
              post.attachments[0].video.image[2].url
            ) {
              imageDiv.style.backgroundImage = `url(${post.attachments[0].video.image[2].url})`;
            }
          }

          // Добавляем стили к тексту поста
          const paragraph = document.createElement("p");
          paragraph.textContent =
            text.length > 100 ? text.substring(0, 97) + "..." : text;
          paragraph.style.color = "#000000";
          paragraph.style.fontSize = "16px";
          paragraph.style.lineHeight = "22px";

          // Добавляем изображение и текст поста к посту

          postItem.appendChild(imageDiv);

          postItem.appendChild(paragraph);
          postItem.addEventListener("click", () => {
            document
              .getElementById("wrapper_vk_post")
              .addEventListener("click", () => {
                document.getElementById("wrapper_vk_post").style.display =
                  "none";
              });
            document.getElementById("wrapper_vk_post").style.display =
              "flex";
            document.getElementById("vk_post").innerHTML = "";
            VK.Widgets.Post(`vk_post`, post.owner_id, post.id, post.hash);
          });

          // Добавляем пост в контейнер swiper-wrapper
          swiperWrapper.appendChild(postItem);
        });

        // Инициализируем Swiper
        var swiper = new Swiper(".mySwiper", {
          slidesPerView: 4,
          spaceBetween: 24,
        });

        swiper.on("reachEnd", function () {
          // Загружаем следующую порцию постов при достижении конца
          load((count = 10), (offset += 10));
        });
      })
      .catch((error) => {
        console.error("Ошибка при получении постов:", error);
      });
  }
  load();
  var swiper = new Swiper(".mySwiper2", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    slidesPerView: 2,
    centeredSlides: true,
    loop: true,
    roundLengths: true,
    shadow: false,
    initialSlide: 2, 
    coverflowEffect: {
      rotate: 0,
      stretch: 60,
      depth: 300,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });