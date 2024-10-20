export default {
  user: {
    status: "success",
    message: "Request completed successfully",
    data: {
      user: {
        id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "User",
        username: null,
        email: "user@gmail.com",
        system_role: null,
        organization_roles: null,
        created_at: "2024-09-06 01:35:20",
        updated_at: "2024-09-06 01:35:20",
      },
    },
  },
  organizer: {
    status: "success",
    message: "Request completed successfully",
    data: {
      user: {
        id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "Organizer",
        username: "organizer",
        email: "organizer@gmail.com",
        system_role: "USER",
        organization_roles: [
          {
            id: "xxxxxxxxxxxx-1111-xxxx-xxxx-xxxxxxxxxxxx",
            name: "Dhaka University",
            role: "OWNER",
          },
          {
            id: "xxxxxxxxxxxx-2222-xxxx-xxxx-xxxxxxxxxxxx",
            name: "Khulna College",
            role: "EDITOR",
          },
          {
            id: "xxxxxxxxxxxx-3333-xxxx-xxxx-xxxxxxxxxxxx",
            name: "Jessore College",
            role: "EDITOR",
          },
        ],
        created_at: "2024-09-06 01:35:20",
        updated_at: "2024-09-06 01:35:20",
      },
    },
  },
  administrator: {
    status: "success",
    message: "Request completed successfully",
    data: {
      user: {
        id: "xxxxxxxxxxxx-xxxx-1111-xxxx-xxxxxxxxxxxx",
        name: "System Administrator",
        username: null,
        email: "administrator@gmail.com",
        system_role: "ADMINISTRATOR",
        organization_roles: null,
        created_at: "2024-09-06 01:35:20",
        updated_at: "2024-09-06 01:35:20",
      },
    },
  },
  systemEditor: {
    status: "success",
    message: "Request completed successfully",
    data: {
      user: {
        id: "xxxxxxxxxxxx-xxxx-2222-xxxx-xxxxxxxxxxxx",
        name: "System Editor",
        username: null,
        email: "systemeditor@gmail.com",
        system_role: "EDITOR",
        organization_roles: null,
        created_at: "2024-09-06 01:35:20",
        updated_at: "2024-09-06 01:35:20",
      },
    },
  },
};
