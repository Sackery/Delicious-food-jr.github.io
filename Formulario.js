     function mostrarFormulario(tipo) {
      const formNormal = document.getElementById("pqrsForm");
      const formAnon = document.getElementById("pqrsAnonimaForm");

      if (tipo === "normal") {
        formNormal.classList.remove("oculto");
        formAnon.classList.add("oculto");
      } else if (tipo === "anonimo") {
        formAnon.classList.remove("oculto");
        formNormal.classList.add("oculto");
      }
    }




    const scriptURL = "https://script.google.com/macros/s/AKfycbyjvawJUMdggGS2mw9hCTrEPSwnDJsP7mtIN3bPMWxWxwTj1QTj1bAVbvPMvQINHEkqkA/exec";
    const form = document.getElementById("pqrsForm");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", e => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());

      fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(res => {
        if (res.ok) {
          mensaje.textContent = "✅ Tu PQRS fue enviada correctamente.";
          mensaje.style.color = "green";
          form.reset();
           setTimeout(() => {
        window.location.href = "https://sackery.github.io/Delicious-food-jr.github.io/";
      }, 2000);
        } else {
          mensaje.textContent = "❌ Error al enviar la PQRS.";
          mensaje.style.color = "red";
        }
      })
      .catch(() => {
        mensaje.textContent = "❌ No se pudo conectar al servidor.";
        mensaje.style.color = "red";
      });
    });

    const scriptURLAnon = "https://script.google.com/macros/s/AKfycbzTL918TdCTP87q0kV59CXixtSzN7uRHhAw4NuYIMqSZrsgstKpqwbI4XL_4CA43D4m/exec"; // otra URL o la misma si quieres
    const formAnon = document.getElementById("pqrsAnonimaForm");
    const mensajeAnon = document.getElementById("mensajeAnon");

    formAnon.addEventListener("submit", e => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(formAnon).entries());

      fetch(scriptURLAnon, {
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(res => {
        if (res.ok) {
          mensajeAnon.textContent = "✅ Tu PQRS anónima fue enviada correctamente.";
          mensajeAnon.style.color = "green";
          formAnon.reset();
           setTimeout(() => {
        window.location.href = "https://sackery.github.io/Delicious-food-jr.github.io/";
      }, 2000);

        } else {
          mensajeAnon.textContent = "❌ Error al enviar la PQRS.";
          mensajeAnon.style.color = "red";
        }
      })
      .catch(() => {
        mensajeAnon.textContent = "❌ No se pudo conectar al servidor.";
        mensajeAnon.style.color = "red";
      });
    });

