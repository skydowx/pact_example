const { Model } = require("objection");
// const userProfile = require("./UserProfile");

class TenantProfile extends Model {
  static get tableName() {
    return "Tenant_Profile";
  }

  static get idColumn() {
    return "tenant_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["tenant_id", "tenant_name"],

      properties: {
        tenant_id: "integer",
        tenant_name: "string",
      },
    };
  }

  // tenant has many users_profile (members)
  static get relationMappings() {
    return {
      members: {
        relation: Model.HasManyRelation,
        modelClass: userProfile,
        join: {
          from: "Tenant_Profile.tenant_id",
          to: "User_Profile.tenant_id",
        },
      },
    };
  }
}

module.exports = TenantProfile;
