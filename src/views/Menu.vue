<template>
  <div id="#menu" class="menu page-wrapper">
    <h2 v-if="store">
      {{store.storeName}}
    </h2>

    <div class="modeToggle-ctn" v-if="store && store.email == currentUser">
      <button class="edit-btn" v-show="mode == 'view'" @click="toggleEdit">
        Edit
      </button>
      <button class="cancel-btn" v-show="mode == 'edit'" @click="cancelEdit">
        Cancel
      </button>
      <button class="save-btn" v-show="mode == 'edit'" @click="saveData">
        Save
      </button>
    </div>

    <div class="mode-ctn" v-bind:class="mode == 'view' ? 'view-mode' : 'edit-mode'">
      <div class="edit-ctn"
        v-if="store && store.email == currentUser"
        v-show="mode == `edit`">
      </div>
      <div class="view-ctn"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin: 0;
  text-align: center;
}
.modeToggle-ctn {
  background: #eee;
  bottom: 0;
  left: 0;
  padding: 10px;
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 3;
  button {
    border: 0;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.05em;
    outline: 0;
    padding: 15px;
    text-transform: uppercase;
    width: 48%;
    margin: 0 1%;
  }
}
.mode-ctn {
  position: relative;
  z-index: 1;
  padding-top: 20px;
  display: flex;
}
.modeToggle-ctn + .mode-ctn {
  padding-bottom: 50px;
}
.edit-ctn,
.view-ctn {
  font-size: 16px;
  max-width: 800px;
  padding: 25px;
  vertical-align: top;
}
.edit-ctn,
.edit-mode .view-ctn {
  margin: 0;
  width: 50%;
}
.edit-ctn {
  border: 1px dashed #ddd;
}
.edit-mode .view-ctn {
  background: #f5f5f5;
}
.view-ctn {
  display: block;
  margin: 0 auto;
  width: 100%;
  background: #f5f5f5;
}
</style>

<style lang="scss">
.edit-ctn {
  .section-edit {
    margin-bottom: 10px;
    padding: 10px 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .item-edit {
    margin-top: 10px;
    padding: 10px 20px;
  }
  fieldset {
    position: relative;
  }
  fieldset + .add-section-btn,
  fieldset + .add-item-btn {
    margin-top: 10px;
  }
  .remove-section-btn,
  .remove-item-btn {
    position: absolute;
    top: 0.8em;
    right: 0;
    border-radius: 100%;
    transform: translate(50%,-50%);
    width: 2.1em;
    height: 2.1em;
  }
}
</style>

<style lang="scss">
.view-ctn {
  .section-view {
    & {
      margin-bottom: 40px;
    }
    h3 {
      margin: 0 auto 10px;
      text-align: center;
    }
    p {
      padding: 0 20px;
      margin: 0 auto 20px;
      text-align: center;
    }
    table {
      width: 100%;
      margin: 0 auto 10px;
    }
    .name {
      font-weight: 600;
    }
    .price {
      text-align: right;
    }
    .desc {
      font-style: italic;
    }
  }
}
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  data() {
    return {
      mode: 'view',
      store: [],
      menuData: [],
      draft: [],
    };
  },
  props: ['isConnected', 'currentUser', 'currentUserID', 'userData', 'userMenu', 'storeEmail'],
  mounted() {
    firebase.firestore().collection('menus').where('storeName', '==', this.$route.params.storeName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.store = doc.data();
          this.menuData = this.store.menu;
          this.updateView(this.menuData);
        });

        // set listener
        firebase.firestore().collection('menus').doc(this.store.email)
          .onSnapshot((doc) => {
            this.store = doc.data();
            this.menuData = this.store.menu;
            this.updateView(this.menuData);
          });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  },
  methods: {
    toggleEdit() {
      this.mode = 'edit';
      this.updateEdit();
    },
    saveData() {
      this.mode = 'view';
      this.menuData = this.draft;
      firebase.firestore().collection('menus').doc(this.currentUser).update({
        menu: this.menuData,
      });
    },
    addSection(section) {
      const sectionsCtn = document.querySelector('.edit-sections');
      const sectionName = (section) ? section.name : '';
      const sectionDesc = (section) ? section.desc : '';

      const newSection = document.createElement('fieldset');
      newSection.className = 'section-edit';
      newSection.innerHTML = `
        <legend>Section</legend>
        <table>
          <tr>
            <td>Name:</td>
            <td><input type="text" data-input="name" value="${sectionName}"/></td>
          </tr>
          <tr>
            <td class="desc">Description:</td>
            <td><input type="text" data-input="desc" value="${sectionDesc}"/></td>
          </tr>
        </table>`;

      const addItemBtnEl = document.createElement('button');
      addItemBtnEl.className = 'add-item-btn';
      addItemBtnEl.innerText = 'Add Item';
      addItemBtnEl.addEventListener('click', (ee) => {
        this.addMenuItem(ee.target);
      });
      newSection.insertAdjacentElement('beforeEnd', addItemBtnEl);

      const removeSectionBtnEl = document.createElement('button');
      removeSectionBtnEl.className = 'remove-section-btn';
      removeSectionBtnEl.innerHTML = '&times;';
      removeSectionBtnEl.addEventListener('click', () => {
        sectionsCtn.removeChild(newSection);
        this.updateData();
      });
      newSection.insertAdjacentElement('beforeEnd', removeSectionBtnEl);

      if (section && section.items.length) {
        section.items.forEach((menuItem) => {
          newSection.insertAdjacentElement('beforeEnd', addItemBtnEl);
          this.addMenuItem(addItemBtnEl, menuItem);
        });
      }

      newSection.addEventListener('input', () => {
        this.updateData();
      });
      sectionsCtn.insertAdjacentElement('beforeEnd', newSection);
    },
    addMenuItem(target, menuItem) {
      const menuItemName = (menuItem) ? menuItem.name : '';
      const menuItemPrice = (menuItem) ? menuItem.price : '';
      const menuItemDesc = (menuItem) ? menuItem.desc : '';

      const newItem = document.createElement('fieldset');
      newItem.className = 'item-edit';
      newItem.innerHTML = `
        <legend>Item</legend>
        <table>
          <tr>
            <td>Name:</td>
            <td><input type="text" data-input="name" value="${menuItemName}"/></td>
          </tr>
          <tr>
            <td>Price:</td>
            <td><input type="text" data-input="price" value="${menuItemPrice}"/></td>
          </tr>
          <tr>
            <td>Description:</td>
            <td><input type="text" data-input="desc" value="${menuItemDesc}"/></td>
          </tr>
        </table>`;

      const removeItemBtnEl = document.createElement('button');
      removeItemBtnEl.className = 'remove-item-btn';
      removeItemBtnEl.innerHTML = '&times;';
      removeItemBtnEl.addEventListener('click', () => {
        newItem.outerHTML = '';
        this.updateData();
      });

      target.insertAdjacentElement('beforeBegin', newItem);
      newItem.appendChild(removeItemBtnEl);
    },
    cancelEdit() {
      this.mode = 'view';
      this.updateView(this.menuData);
    },
    updateData() {
      this.draft = [];
      const sections = document.querySelectorAll('.section-edit');
      Array.prototype.forEach.call(sections, (sectionEl) => {
        const section = {
          name: sectionEl.querySelector('[data-input="name"]').value,
          desc: sectionEl.querySelector('[data-input="desc"]').value,
          items: [],
        };
        const items = sectionEl.querySelectorAll('.item-edit');
        Array.prototype.forEach.call(items, (itemEl) => {
          const item = {
            name: itemEl.querySelector('[data-input="name"]').value,
            price: itemEl.querySelector('[data-input="price"]').value,
            desc: itemEl.querySelector('[data-input="desc"]').value,
          };
          if (item.name || item.price || item.desc) section.items.push(item);
        });
        this.draft.push(section);
      });
      this.updateView(this.draft);
    },
    updateEdit() {
      const editCtn = document.querySelector('.edit-ctn');
      editCtn.innerHTML = '<div class="edit-sections"></div>';

      if (this.menuData) {
        this.menuData.forEach((section) => {
          this.addSection(section);
        });
      }

      const addSectionBtnEl = document.createElement('button');
      addSectionBtnEl.className = 'add-section-btn';
      addSectionBtnEl.innerText = 'Add Section';
      addSectionBtnEl.addEventListener('click', () => {
        this.addSection();
      });

      editCtn.appendChild(addSectionBtnEl);
    },
    updateView(menuData) {
      const viewCtnEl = document.querySelector('.view-ctn');
      let viewCtnMarkup = '';
      menuData.forEach((section) => {
        viewCtnMarkup += '<div class="section-view">';
        if (section.name) viewCtnMarkup += `<h3>${section.name}</h3>`;
        if (section.desc) viewCtnMarkup += `<p>${section.desc}</p>`;
        section.items.forEach((item) => {
          viewCtnMarkup += `
            <table>
              <tr>
                <td class="name">${item.name}</td>
                <td class="price">${item.price}</td>
              </tr>
              <tr>
                <td class="desc" colspan="2">${item.desc}</td>
              </tr>
            </table>`;
        });
        viewCtnMarkup += '</div>';
      });
      viewCtnEl.innerHTML = viewCtnMarkup;
    },
  },
};
</script>
