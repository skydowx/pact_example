exports.seed = async function (knex) {
  try {
    await knex("Tenant_Profile")
      .insert([{ tenant_id: 123456, tenant_name: "Pact Tenant Seed" }])
      .onConflict("tenant_id")
      .ignore();
  } catch (err) {
    console.log(err);
  }
};
