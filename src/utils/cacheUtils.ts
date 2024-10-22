import redisClient from '../infrastructure/cache/RedisClient';

export const invalidateAthleteMetricsCache = async (athleteId: string, metricType?: string) => {
    const aggregateKeys = await redisClient.keys(`athlete_metrics_aggregate_${athleteId}_*`);
    if (aggregateKeys.length > 0) {
        await redisClient.del(aggregateKeys);
    }

    const trendsKeys = await redisClient.keys(`athlete_metrics_trends_${athleteId}_*`);
    if (trendsKeys.length > 0) {
        await redisClient.del(trendsKeys);  
    }
    if (metricType) {
        const leaderboardKeys = await redisClient.keys(`athlete_metrics_leaderboard_${metricType}_*`);
        if (leaderboardKeys.length > 0) {
            await redisClient.del(leaderboardKeys);
        }
    } else {
        const leaderboardKeys = await redisClient.keys(`athlete_metrics_leaderboard_*`);
        if (leaderboardKeys.length > 0) {
            await redisClient.del(leaderboardKeys);
        }
    }
};
