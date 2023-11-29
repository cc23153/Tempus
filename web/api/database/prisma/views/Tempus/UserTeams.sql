SELECT
  T.team_id,
  T.team_name,
  U.user_id,
  U.username
FROM
  [Tempus].[Team] AS T,
  (
    [Tempus].[TeamMembers] AS TM
    JOIN [Tempus].[User] AS U ON TM.user_id = U.user_id
  )
WHERE
  TM.team_id = T.team_id;