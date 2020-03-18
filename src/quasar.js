import Vue from 'vue'

import './styles/quasar.styl'
import lang from 'quasar/lang/pt-br.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QFooter,
  QMenu,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QInput,
  QSeparator,
  ClosePopup,
  QTable,
  QTh,
  QTr,
  QTd,
  QCard,
  QCardSection,
  QCardActions,
  QForm,
  QBreadcrumbs,
  QBreadcrumbsEl,
  QTooltip,
  QDialog,
  QAvatar,
  Notify,
  QExpansionItem,
  QCheckbox,
  QSpace,
  QSelect,
  QPopupProxy,
  QDate,
  Dialog,
  QBadge,
  Loading,
  QToggle,
  QBtnDropdown,
  QPageSticky,
  QMarkupTable,
  QChip,
  QPopupEdit,
  QField
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QLayout,
    QHeader,
    QFooter,
    QMenu,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QInput,
    QSeparator,
    QTable,
    QTh,
    QTr,
    QTd,
    QCard,
    QCardSection,
    QCardActions,
    QForm,
    QBreadcrumbs,
    QBreadcrumbsEl,
    QTooltip,
    QDialog,
    QAvatar,
    QExpansionItem,
    QCheckbox,
    QSpace,
    QPopupProxy,
    QDate,
    QSelect,
    QBadge,
    QToggle,
    QBtnDropdown,
    QPageSticky,
    QMarkupTable,
    QChip,
    QPopupEdit,
    QField
  },
  directives: {
    ClosePopup
  },
  plugins: {
    Dialog,
    QDialog,
    Notify,
    Loading
  },
  config: {
    notify: { /* Notify defaults */ },
    loading: { /* Loading defaults */ }
  },
  lang: lang
})
