const { Model } = require("objection");
const tenantProfile = require("./TenantProfile");

class UserProfile extends Model {
  static get tableName() {
    return "User_Profile";
  }
  static get idColumn() {
    return "user_id";
  }

  // each user belongs to one tenant_profile
  static get relationMappings() {
    return {
      isAmember: {
        relation: Model.BelongsToOneRelation,
        modelClass: tenantProfile,
        join: {
          from: "User_Profile.tenant_id",
          to: "Tenant_Profile.tenant_id",
        },
      },
    };
  }

  // setting up validation for UserProfile Model
  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name", "user_id"],
      properties: {
        user_id: { type: "integer" },
        tenant_id: { type: "integer" },
        first_name: { type: "string" },
        last_name: { type: "string" },
      },
    };
  }
}

module.exports = UserProfile;
