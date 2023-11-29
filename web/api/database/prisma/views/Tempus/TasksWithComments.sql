SELECT
  T.task_id,
  T.task_name,
  C.comment_id,
  C.content
FROM
  (
    [Tempus].[Comment] AS C
    JOIN [Tempus].[Task] AS T ON C.task_id = T.task_id
  );