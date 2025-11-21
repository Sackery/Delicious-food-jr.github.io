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

    // 👉 URLs de tus Apps Script
    const scriptURLNormal = "https://script.google.com/macros/s/AKfycbxV7s34uYBuOdbXb6_CiXzWfF6xeRjg7Gc_pTKJrYCv67x6bma92125NI77LPesVC70PQ/exec";
    const scriptURLAnon   = "https://script.google.com/macros/s/AKfycbwC7c6HWWPfgsYgza5xqi-2vvcuRLznb07hxD0XSl82jvZ6ulPJMUt_lhnOuiPS_poo/exec";

    // 👉 Envío formulario NORMAL
    const form = document.getElementById("pqrsForm");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      fetch(scriptURLNormal, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json().catch(() => null))
      .then(resp => {
        if (resp && resp.status === "OK") {
          mensaje.textContent = `✅ Tu PQRS fue enviada correctamente. ID: ${resp.id}`;
          mensaje.style.color = "green";
          form.reset();
          // Redirigir a inicio si quieres:
          setTimeout(() => { window.location.href = "index.html"; }, 2000);
        } else {
          mensaje.textContent = "✅ Tu PQRS fue enviada (respuesta simple del servidor).";
          mensaje.style.color = "green";
          form.reset();
        }
      })
      .catch(() => {
        mensaje.textContent = "❌ No se pudo conectar al servidor.";
        mensaje.style.color = "red";
      });
    });

    // 👉 Envío formulario ANÓNIMO
    const formAnon = document.getElementById("pqrsAnonimaForm");
    const mensajeAnon = document.getElementById("mensajeAnon");

    formAnon.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(formAnon).entries());

      fetch(scriptURLAnon, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json().catch(() => null))
      .then(resp => {
        if (resp && resp.status === "OK") {
          mensajeAnon.textContent = `✅ Tu PQRS anónima fue enviada correctamente. ID: ${resp.id}`;
          mensajeAnon.style.color = "green";
          formAnon.reset();
          // Redirigir a inicio si quieres:
          setTimeout(() => { window.location.href = "index.html"; }, 2000);
        } else {
          mensajeAnon.textContent = "✅ Tu PQRS anónima fue enviada (respuesta simple del servidor).";
          mensajeAnon.style.color = "green";
          formAnon.reset();
        }
      })
      .catch(() => {
        mensajeAnon.textContent = "❌ No se pudo conectar al servidor.";
        mensajeAnon.style.color = "red";
      });
    });