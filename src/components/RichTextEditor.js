import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import tinymce from "tinymce";

import "tinymce";
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/table";
import "tinymce/plugins/paste";
import "tinymce/plugins/image";
import "tinymce/plugins/preview";
import "tinymce/plugins/imagetools";
import "tinymce/icons/default/icons.min.js";
import "tinymce/themes/silver/theme.min.js";
import "tinymce/skins/ui/oxide/skin.min.css";

const RichTextEditor = ({
  language,
  content,
  disabled,
  height,
  onEditorChange,
}) => {
  return (
    <Editor
      key={language}
      disabled={disabled}
      value={content}
      onEditorChange={onEditorChange}
      init={{
        height,
        language,
        readonly: disabled,
        resize: true,
        menubar: false,
        branding: false,
        smart_paste: true,
        paste_data_images: true,
        paste_enable_default_filters: false,
        statusbar: false, // added by ys
        // images_upload_url: 'postAcceptor.php', //added by ys
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        file_picker_callback: function (cb, value, meta, blobInfo, failure) {
          // added by ys
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */

          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              // size check here
              var image_size = blobInfo.blob().size / 1024; // image size in kbytes
              var max_size = 20 * 1024; // max size in kbytes
              if (image_size > max_size) {
                console.log(
                  "Image is too large( " +
                    image_size +
                    ") ,Maximum image size is:" +
                    max_size +
                    " kB"
                );
                return;
              }
              // size check end
              blobCache.add(blobInfo);
              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        default_link_target: "_blank",
        object_resizing: "img, video",
        plugins: [
          "link",
          "image",
          "imagetools",
          "code",
          "table",
          "preview",
          "paste",
          "advlist",
          "lists",
          "image code",
        ],
        toolbar:
          "undo redo | formatselect fontsizeselect | bold italic strikethrough underline forecolor backcolor removeformat | link image | alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | table preview",
      }}

      // init={{
      //   selector: "textarea#local-upload",
      //   plugins: "image code",
      //   toolbar: "undo redo | image code",

      //   /* without images_upload_url set, Upload tab won't show up*/
      //   images_upload_url: "postAcceptor.php",

      //   /* we override default upload handler to simulate successful upload*/
      //   images_upload_handler: function (blobInfo, success, failure) {
      //     setTimeout(function () {
      //       /* no matter what you upload, we will turn it into TinyMCE logo :)*/
      //       success("http://moxiecode.cachefly.net/tinymce/v9/images/logo.png");
      //     }, 2000);
      //   },
      //   content_style:
      //     "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      // }}
    />
  );
};

export default memo(RichTextEditor);
