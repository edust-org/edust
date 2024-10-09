export default {
  user: {
    status: "success",
    message: "Request completed successfully",
    data: {
      token: "user",
      user: {
        id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "User",
        username: null,
        email: "user@gmail.com",
        password: "password2024",
        account_type: "local",
        account_details: null,
        is_verified: true,
        is_profile_verified: false,
        role_types: null,
        created_at: "2024-09-06 01:35:20",
        updated_at: "2024-09-06 01:35:20",
      },
    },
  },
  organizer: {
    status: "success",
    message: "Request completed successfully",
    data: {
      token: "organizer",
      user: {
        id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "Organizer",
        username: "organizer",
        email: "organizer@gmail.com",
        password: "password2024",
        account_type: "local",
        account_details: null,
        is_verified: true,
        is_profile_verified: true,
        role_types: {
          has_organization: true,
        },
        created_at: "2024-09-06 01:35:20",
        updated_at: "2024-09-06 01:35:20",
      },
      organizations: [
        {
          id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          name: "org name",
          org_username: "org_username",
          is_profile_verified: false,
          created_at: "2024-09-06 01:35:20",
          updated_at: "2024-09-06 01:35:20",
          role: "OWNER",
        },
      ],
    },
  },
  administrator: {
    status: "success",
    message: "Request completed successfully",
    data: {
      token: "administrator",
      user: {
        id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        name: "Administrator",
        username: null,
        email: "administrator@gmail.com",
        password: "password2024",
        account_type: "local",
        account_details: {},
        is_verified: true,
        is_profile_verified: true,
        role_types: {
          system: "ADMINISTRATOR",
        },
        created_at: "2024-09-06 01:35:20",
        updated_at: "2024-09-06 01:35:20",
      },
    },
  },
};
