function activationEmailTemplate(name, link) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Activa tu cuenta</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" 
        style="max-width:600px; background-color:#1c1c1c; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.2);">
        
        <tr>
          <td style="background-color:#28a745; color:#ffffff; text-align:center; padding:20px; font-size:24px; font-weight:bold;">
            SideKick
          </td>
        </tr>

        <tr>
          <td style="padding:30px; color:#f0f0f0; font-size:16px; line-height:1.5;">
            <p>Hola ${name},</p>
            <p>Gracias por registrarte en SideKick. Para activar tu cuenta haz click en el siguiente botón:</p>
            <p style="text-align:center; margin:30px 0;">
              <a href="${link}" 
                 style="background-color:#28a745; color:#ffffff; text-decoration:none; padding:12px 25px; border-radius:5px; display:inline-block; font-weight:bold;">
                 Activar mi cuenta
              </a>
            </p>
            <p>Si no creaste esta cuenta, simplemente ignora este correo.</p>
            <p>¡Gracias!<br/>El equipo de SideKick</p>
          </td>
        </tr>

        <tr>
          <td style="background-color:#111111; color:#aaaaaa; text-align:center; padding:15px; font-size:12px;">
            © ${new Date().getFullYear()} SideKick. Todos los derechos reservados.
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
}

function resetPasswordEmailTemplate(name, newPassword) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Recuperar contraseña</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" 
        style="max-width:600px; background-color:#1c1c1c; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.2);">
        
        <tr>
          <td style="background-color:#28a745; color:#ffffff; text-align:center; padding:20px; font-size:24px; font-weight:bold;">
            SideKick
          </td>
        </tr>

        <tr>
          <td style="padding:30px; font-size:16px; line-height:1.5; color:#f0f0f0;">
            <p style="color:#f0f0f0; margin:0 0 15px;">Hola ${name},</p>
            <p style="color:#f0f0f0; margin:0 0 15px;">
              Hemos recibido una solicitud para restablecer tu contraseña.
            </p>
            <p style="text-align:center; margin:30px 0; font-size:18px; color:#ffffff;">
              <strong style="color:#ffffff;">Nueva contraseña: ${newPassword}</strong>
            </p>
            <p style="color:#f0f0f0; margin:0 0 15px;">
              Si no solicitaste este cambio, por favor contacta a nuestro soporte inmediatamente.
            </p>
            <p style="color:#f0f0f0; margin:0;">
              ¡Gracias!<br/>El equipo de SideKick
            </p>
          </td>
        </tr>

        <tr>
          <td style="background-color:#111111; color:#aaaaaa; text-align:center; padding:15px; font-size:12px;">
            © ${new Date().getFullYear()} SideKick. Todos los derechos reservados.
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
}

module.exports = { activationEmailTemplate, resetPasswordEmailTemplate };
