import { reactive, computed } from "vue";

const state = reactive({
  isCartSidebarOpen: false,
  isLoginModalOpen: false,
});

const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
const toggleCartSidebar = (): void => {
  state.isCartSidebarOpen = !state.isCartSidebarOpen;
};

const isLoginModalOpen = computed(() => state.isLoginModalOpen);
const toggleLoginModal = (): void => {
  state.isLoginModalOpen = !state.isLoginModalOpen;
};

const uiState = {
  isCartSidebarOpen,
  isLoginModalOpen,
  toggleCartSidebar,
  toggleLoginModal,
};

export default uiState;
