export const groups = {
  roles: {
    name: "Quản lí vai trò",
    perms: {
      get: {
        k: "READ_ROLE",
        v: "Xem danh sách vai trò",
      },
      create: {
        k: "CREATE_ROLE",
        v: "Tạo vai trò",
      },
      update: {
        k: "UPDATE_ROLE",
        v: "Cập nhật vai trò",
      },
      delete: {
        k: "DELETE_ROLE",
        v: "Xóa vai trò",
      },
    },
  },
  users: {
    name: "Quản lí người dùng",
    perms: {
      get: {
        k: "READ_USER",
        v: "Xem danh sách người dùng",
      },
      create: {
        k: "CREATE_USER",
        v: "Tạo người dùng",
      },
      lock: {
        k: "LOCK_USER",
        v: "Khóa tài khoản người dùng",
      },
      grant: {
        k: "GRANT_USER",
        v: "Cấp quyền người dùng",
      },
      resetUserPass: {
        k: "RESET_USER_PASSWORD",
        v: "Khôi phục tài khoản người dùng",
      },
    },
  },
  units: {
    name: "Quản lí đơn vị hành chính",
    perms: {
      get: {
        k: "READ_UNIT",
        v: "Xem danh sách đơn vị hành chính",
      },
      create: {
        k: "CREATE_UNIT",
        v: "Tạo đơn vị hành chính",
      },
      update: {
        k: "UPDATE_UNIT",
        v: "Cập nhật đơn vị hành chính",
      },
      delete: {
        k: "DELETE_UNIT",
        v: "Xóa đơn vị hành chính",
      },
    },
  },
  companies: {
    name: "Quản lí công ty",
    perms: {
      get: {
        k: "READ_COMPANY",
        v: "Xem danh sách công ty, phòng ban, chức vụ",
      },
      create: {
        k: "CREATE_COMPANY",
        v: "Tạo công ty, phòng ban, chức vụ",
      },
      update: {
        k: "UPDATE_COMPANY",
        v: "Cập nhật công ty, phòng ban, chức vụ",
      },
      delete: {
        k: "DELETE_COMPANY",
        v: "Xóa công ty, phòng ban, chức vụ",
      },
    },
  },
  categories: {
    name: "Quản lí danh mục địa điểm",
    perms: {
      get: {
        k: "READ_CATEGORY",
        v: "Xem danh sách danh mục địa điểm",
      },
      create: {
        k: "CREATE_CATEGORY",
        v: "Tạo danh mục địa điểm",
      },
      update: {
        k: "UPDATE_CATEGORY",
        v: "Cập nhật danh mục địa điểm",
      },
      delete: {
        k: "DELETE_CATEGORY",
        v: "Xóa danh mục địa điểm",
      },
    },
  },
  places: {
    name: "Quản lí địa điểm",
    perms: {
      get: {
        k: "READ_PLACE",
        v: "Xem danh sách địa điểm",
      },
      browse: {
        k: "BROWSE_PLACE",
        v: "Xét duyệt địa điểm",
      },
    },
  },
};
