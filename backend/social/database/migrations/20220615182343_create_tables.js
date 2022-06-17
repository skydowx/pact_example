exports.up = function (knex) {
  return knex.schema
    .createTable("Tenant_Profile", (t) => {
      t.integer("tenant_id").notNullable().primary();
      t.string("tenant_name").notNullable();
      t.string("address");
      t.string("city");
      t.string("state");
      t.string("country");
      t.string("zip_code");
      t.string("phone");
      t.string("web_url");
    })
    .createTable("User_Profile", (t) => {
      t.integer("user_id").notNullable().primary();
      t.string("first_name").notNullable();
      t.string("last_name").notNullable();
      t.string("department");
      t.string("designation");
      t.integer("tenant_id").references("tenant_id").inTable("Tenant_Profile");
      t.string("image_url");
      t.string("city");
      t.string("country");
      t.string("bio");
      t.json("social_links");
      t.integer("employee_id");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("User_Profile").dropTable("Tenant_Profile");
};
