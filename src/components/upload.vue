<template>
  <el-upload
    class="upload-img"
    action="https://xxxx"
    accept="image/jpeg"
    :auto-upload="true"
    :show-file-list="false"
    :http-request="handleFilesUpload"
  >
    <div class="upload-img__content" v-loading="loading">
      <div class="img-box preview-img" v-if="path && !loading">
        <img :src="path" />
      </div>
      <i class="el-icon-plus upload-img-icon"></i>
    </div>
  </el-upload>
</template>

<script>
import { uploadImage } from '@/api/common.js';
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      path: '',
      loading: false
    };
  },
  watch: {
    imgUrl() {
      this.path = this.imgUrl;
    }
  },
  methods: {
    async handleFilesUpload(item) {
      this.loading = true;
      let { file } = item;
      let path = window.URL.createObjectURL(file);
      this.path = path;
      let img = await this.trunDataUrl(path);
      this.compress(img);
    },
    trunDataUrl(path) {
      let img = new Image();
      img.src = path;
      return new Promise((resolve, reject) => {
        img.onload = function() {
          resolve(img);
        };
      });
    },
    compress(img) {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      context.clearRect(0, 0, img.width, img.height);
      context.drawImage(img, 0, 0, img.width, img.height);
      let base64 = canvas.toDataURL('image/jpeg', 0.8);
      uploadImage({}, { base64: base64 }).then(res => {
        if (res.data.error_code === 0) {
          this.$emit('success', res.data.data.key);
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss">
.upload-img .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.upload-img__content {
  display: flex;
}
.upload-img .upload-img-icon:hover {
  border-color: #409eff;
}
.upload-img-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  box-sizing: border-box;
}
.preview-img {
  width: 120px;
  display: block;
}
</style>
