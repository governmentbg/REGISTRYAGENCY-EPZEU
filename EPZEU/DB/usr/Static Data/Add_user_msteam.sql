
INSERT INTO usr.users ("user_id", "cin", "email", "first_name", "middle_name", "family_name", "contact_data", "organization", "special_access_user_type", "cr_bulletin_acceptance", "pr_bulletin_acceptance", "status", "created_by", "created_on", "updated_by", "updated_on", "is_system")
VALUES
    (3, 3, E'msteam@cnsys.bg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, E'2018-04-26 11:08:39.230553+03', 1, E'2018-04-26 11:08:39.23332+03', False);
    
INSERT INTO 
  usr.user_authentications
(
  user_id,
  authentication_type,
  password_hash,
  username,
  created_by,
  created_on,
  updated_by,
  updated_on,
  is_locked,
  locked_until
)
VALUES (
  3,
  1,
  '$2y$12$1Wwwgr7i.QGvaSGNAO8F6ecytccu1r8REbiZ.3rQMSM0KyV8pgEeK',
  'msteam@cnsys.bg',
  1,
  E'2018-04-26 11:08:39.230553+03',
  1,
  E'2018-04-26 11:08:39.230553+03',
  FALSE,
  NULL
);



INSERT INTO 
  usr.user_permissions
(
  user_id,
  permission_id,
  is_active,
  created_by,
  created_on,
  updated_by,
  updated_on
)
  SELECT 3, 
         p.permission_id, 
         TRUE,  
         1,
         E'2018-04-26 11:08:39.230553+03',
         1,
         E'2018-04-26 11:08:39.230553+03'
    FROM usr.n_s_permissions AS p;


