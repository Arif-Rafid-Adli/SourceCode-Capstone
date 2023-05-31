const user = require("./User");

const addUserHandler = (request, h) => {
  const { name, email, password } = request.payload;

  if (name == null) {
    const response = h.response({
      status: "failed",
      message: "Gagal melakukan registrasi. Mohon masukkan nama anda.",
    });
    response.code(400);

    return response;
  }
  else {
    const response = h.response ({
        status : ''
    })
  }

  if (email == null) {
    const response = h.response({
      status: "failed",
      message: "Gagal melakukan registrasi, Mohon masukkan email anda.",
    });
    response.code(400);

    return response;
  }

  if (password == null) {
    const response = h.response({
      status: "failed",
      message: "Gagal melakukan registrasi. Mohon masukkan password yang anda.",
    });
    response.code(400);

    return response;
  }
};

module.export = {
  addUserHandler,
};
