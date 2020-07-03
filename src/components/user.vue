<template>
  <div>
  <vxe-table border height="300" :data="userData">
      <vxe-table-column field="id" title="ID" width="70" sortable></vxe-table-column>
      <vxe-table-column field="name" title="名前" width="200"></vxe-table-column>
      <vxe-table-column field="kanaName" title="フリガナ" width="200" sortable></vxe-table-column>
      <vxe-table-column field="age" title="年齢" widrh="100" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="性別" width="100" sortable></vxe-table-column>
      <vxe-table-column field="address" title="住所" width="300" show-overflow></vxe-table-column>
      <vxe-table-column title="編集" width="100" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" status="primary" @click="editEvent(row)">
            <font-awesome-icon icon="edit" />
          </vxe-button>
          <vxe-button type="text" status="danger">
            <font-awesome-icon icon="trash-alt" />
          </vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-modal ref="xModal" v-model="showEdit" title="編集" width="800" resize destroy-on-close>
      <vxe-form
        :data="formData"
        :rules="formRules"
        title-align="right"
        title-width="100"
        @submit="submitEvent"
      >
        <vxe-form-item
          title="基本情報"
          span="24"
          title-align="left"
          title-width="200"
          :title-prefix="{icon: 'fa fa-address-card-o'}"
        ></vxe-form-item>
        <vxe-form-item
          title="名前"
          field="name"
          span="12"
          :item-render="{name: 'input', attrs: {placeholder: '名前'}}"
        ></vxe-form-item>
        <!-- <vxe-form-item
          title="ニックネーム"
          field="nickname"
          span="12"
          :item-render="{name: 'input', attrs: {placeholder: 'ニックネーム'}}"
        ></vxe-form-item> -->
        <vxe-form-item
          title="性別"
          field="sex"
          span="12"
          :item-render="{name: '$select', options: sexList}"
        ></vxe-form-item>
        <vxe-form-item
          title="年齢"
          field="age"
          span="12"
          :item-render="{name: 'input', attrs: {type: 'number', placeholder: '年齢'}}"
        ></vxe-form-item>
        <vxe-form-item
          title="住所"
          field="address"
          span="24"
          :title-suffix="{message: '啦啦啦，就是这么强大！！！', icon: 'fa fa-question-circle'}"
          :item-render="{name: 'textarea', attrs: {placeholder: '住所'}}"
        ></vxe-form-item>
        <vxe-form-item
          title="その他の情報"
          span="24"
          title-align="left"
          title-width="200px"
          :title-prefix="{message: 'その他の情報をここに入れる', icon: 'fa fa-info-circle'}"
        ></vxe-form-item>
        <vxe-form-item
          title="コメント"
          field="comment"
          span="24"
          :item-render="{name: 'input', attrs: {type: 'number', placeholder: '特記事項'}}"
        ></vxe-form-item>
        <vxe-form-item
          title="日付"
          field="date3"
          span="12"
          :item-render="{name: 'input', attrs: {type: 'date', placeholder: '2020/04/12'}}"
        ></vxe-form-item>

        <vxe-form-item align="center" span="24">
          <vxe-button type="submit" status="primary">保存</vxe-button>
          <vxe-button type="reset">リセット</vxe-button>
          <vxe-button @click="$refs.xModal.close()">取消</vxe-button>
        </vxe-form-item>
      </vxe-form>
    </vxe-modal>
  </div>
</template>

<script>
export default {
data() {
  return {
    userData: [
      {
        id: 1,
        name: "山本太郎",
        kanaName: "ヤマモトタロウ",
        age: 30,
        sex: "男",
        address: "大阪市大阪府"
      },
      {
        id: 2,
        name: "近藤勇",
        kanaName:"コンドウイサム",
        age: 36,
        sex: "男",
        address: "東京都江戸川区"
      },
      {
        id: 3,
        name: "神崎空",
        kanaName: "カンザキソラ",
        age: 24,
        sex: "男",
        address: "沖縄県那覇市"
      }
    ],
      selectRow: null,
      showEdit: false,
      sexList: [
        { label: "", value: "" },
        { label: "女", value: "0" },
        { label: "男", value: "1" }
      ],
      formData: null,
      formRules: {
        name: [
          { required: true, message: "なまえ！？" },
          { min: 3, max: 5, message: "3~5" }
        ],
        nickname: [{ required: true, message: "ニックネーム！？" }],
        sex: [{ required: true, message: "性別！？" }]
      }
    };
  
  
},
methods: {
  
   formatterSex({ cellValue }) {
      const item = this.sexList.find(item => item.value === cellValue);
      return item ? item.label : "";
    },

    editEvent(row) {
      this.formData = {
        name: row.name,
        nickname: row.nickname,
        role: row.role,
        sex: row.sex,
        age: row.age,
        num: row.num,
        date3: row.date3,
        address: row.address
      };
      this.selectRow = row;
      this.showEdit = true;
    },

    submitEvent() {
      this.showEdit = false;
      this.$XModal.message({ message: "保存成功", status: "success" });
      const data = Object.assign(this.selectRow, this.formData);
      console.log(data);
    }
  }
}

</script>

<style>
</style>