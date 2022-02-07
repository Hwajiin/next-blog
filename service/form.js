class FormUtils {
  constructor(
    setLoading,
    form,
    setForm,
    pid,
    database,
    firebaseAuth,
    imageService
  ) {
    this.setLoading = setLoading;
    this.form = form;
    this.setForm = setForm;
    this.pid = pid;
    this.database = database;
    this.firebaseAuth = firebaseAuth;
    this.imageService = imageService;
  }

  uploadingPost = async (postId, category, data) => {
    const idToken = await this.firebaseAuth.getIdToken();

    if (!postId) {
      await this.database.upload(
        category,
        {
          date: new Date(),
          ...data,
        },
        idToken
      );
    } else {
      await this.database.edit(
        category,
        postId,
        {
          ...data,
        },
        idToken
      );
    }
  };

  // TODO: Validate 강화하기
  validate = () => {
    const keys = Object.keys(this.form);

    let result;
    keys.map((key) => {
      if (key === "imgFile") {
        result = this.form[key] === "" ? false : true;
      } else {
        result = this.form[key].trim() === "" ? false : true;
      }
    });

    return result;
  };

  textFormatting = (value) => {
    return value.replaceAll(/(\n|\r)/g, "<br>");
  };

  postingByCategory = async (category) => {
    let data;
    this.setLoading(true);

    switch (category) {
      // Gallery
      case "gallery":
        const uploadedImgInfo = await this.imageService.upload(
          this.form.imgFile
        );

        data = {
          title: this.form.title,
          url: uploadedImgInfo.url,
          filename: uploadedImgInfo.original_filename,
          image_id: uploadedImgInfo.public_id,
        };

        await this.uploadingPost(this.pid, "gallery", data);
        await this.setLoading(false);

        break;

      // Journal
      case "journal":
        data = {
          title: this.form.title,
          contents: this.textFormatting(this.form.contents),
        };

        await this.uploadingPost(this.pid, "journal", data);
        await this.setLoading(false);
        break;

      // FAQ
      case "faq":
        data = {
          title: this.form.title,
          contents: this.textFormatting(this.form.contents),
        };

        await this.uploadingPost(this.pid, "faq", data);
        await this.setLoading(false);
        break;
    }
  };

  reset = () => {
    const keys = Object.keys(this.form);
    keys.map((key) => (this.form[key] = ""));
    this.setForm({
      ...this.form,
    });
  };
}

export default FormUtils;

export const convertHTMLElement = (value) => {
  return value.replaceAll(/<br\s*[\/]?>/gi, "\r\n");
};
