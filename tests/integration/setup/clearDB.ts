import * as models from '@models';

export async function clearDB() {
  return await Promise.all(
    Object.values(models).map(model => {
      return model.destroy({
        where: {},
        truncate: true
      });
    })
  );
}
