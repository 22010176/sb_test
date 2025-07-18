using Microsoft.EntityFrameworkCore;

namespace Utilities;

public static class DatabaseUtilities
{
  public static async Task BulkInsertAsync<TEntity>(
      DbContext dbContext,
      IEnumerable<TEntity> entities,
      int batchSize = 100,
      Action<int>? onProgress = null) where TEntity : class
  {
    if (dbContext is null) throw new ArgumentNullException(nameof(dbContext));
    if (entities is null) throw new ArgumentNullException(nameof(entities));

    // var entityList = entities as IList<TEntity> ?? [.. entities];
    int total = entities.Count();
    dbContext.ChangeTracker.AutoDetectChangesEnabled = false;
    try
    {
      for (int i = 0; i < total; i += batchSize)
      {
        var batch = entities.Skip(i).Take(batchSize);

        await dbContext.Set<TEntity>().AddRangeAsync(batch);
        await dbContext.SaveChangesAsync();

        dbContext.ChangeTracker.Clear(); // Clear EF cache to free memory

        onProgress?.Invoke(i + batchSize);
      }
    }
    finally
    {
      dbContext.ChangeTracker.AutoDetectChangesEnabled = true;
    }
  }
}