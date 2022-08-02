/* Data for the 'eml.n_s_email_templates' table  (Records 1 - 9) */

INSERT INTO eml.n_s_email_templates ("template_id", "subject", "body", "is_body_html", "created_by", "created_on", "updated_by", "updated_on")
VALUES 
  (1, E'�������� �� �����', E'���� �� �����', True, 1, E'2018-05-09 16:16:28.78349+03', 1, E'2018-05-09 16:16:28.78349+03'),
  (7, E'����� ����������� � ���� ����/�������� ��� ������', E'����: {THEME}<br />\r\n��������: {COMMENT}<br />\r\n���� �� �����������: {COMMENT_DATE}', True, 2, E'2018-08-08 10:59:06.232241+03', 2, E'2018-08-08 10:59:06.237908+03'),
  (5, E'����� - ������� ������ �� ������� �� �� �� ��������� �� ������', E'���������,<br /><br />���������� �� ��� ��������� ������ �� �������� �� ������� �� ���� ������� �� ������������� �� ��������� �� ���������.<br />{STATUS_REASON}<br />��� ����� �������, ���� �� �� �������� � ��� �� ������� 0700 121 07.<br /><br />� ��������,<br />������ �� ��������� �� ���������.', True, 2, E'2018-05-18 07:46:39.606398+03', 2, E'2018-05-18 07:46:39.608823+03'),
  (2, E'����� - ���������� �� ����������� � ������� �� �� �� ��������� �� ������', E'���������, <br /><br />\r\n��� ���������� ������� ����������� � ������� ������ �� ��������� �� ���������� ������ �� ��������� �� ���������.<br />\r\n������ ��������� ���������������� ����� (���) � : {CIN}<br />\r\n�� �� ������� � ���������, � ���������� �� ���������� ������� ��.<br />\r\n����, �������� �� ����� ��-����, �� �� ���������� ������� ��:<br /><br />\r\n<a href=\"{ACTIVATION_LINK}\">{ACTIVATION_LINK}</a><br /><br />\r\n��� ��� ����� �� �����, ���������� �� �� �������, ���� ��������� ����� ��� ����� �������� �������. ��� �������� �� �� ���� ��������� �� {DEADLINE}, �� ���� ����������� ������.<br /><br />\r\n�� �� �������� ����������� �����������, ���� �������� <a href=\"{DEACTIVATION_LINK}\">���</a><br />\r\n���� ��������� � �����������, ���� �� �����������!<br />\r\n��� ����� ������������ �������, ���� �� �� �������� � ��� �� ������� 0700 121 07.<br /><br />\r\n\r\n� ��������,<br /> \r\n������ �� ��������� �� ���������.', True, 2, E'2018-05-18 07:43:53.251534+03', 2, E'2018-05-18 07:43:53.257532+03'),
  (3, E'����� - ���� ������ �� ������� �� �� �� ��������� �� ������', E'���������,<br /><br />\r\n��� �������� \"��������� ������\" �� ������ �� ������� �� ��.<br />\r\n�� �� ��������� �������� �� �� ������, � ���������� �� ���������� ������� ��-���� ����:<br /><br />\r\n<a href=\"{ACTIVATION_LINK}\">{ACTIVATION_LINK}</a><br /><br />\r\n��� ��� ����� �� �����, ���������� �� �� �������, ���� ��������� ����� ��� ����� �������� �������. ��� ������� �� ���� ��������� �� {DEADLINE}, ������ �� ���� ����������� �����������.<br /><br />\r\n���� ��������� � �����������, ���� �� �����������! ��� ����� ������������ �������, ���� �� �� �������� � ��� �� ������� 0700 121 07.<br /><br />\r\n� ��������,<br />\r\n������ �� ��', True, 2, E'2018-05-18 07:45:32.663039+03', 2, E'2018-05-18 07:45:32.665573+03'),
  (4, E'����� - ������� ������ �� ������� �� �� �� ��������� �� ������', E'���������,<br /><br />\r\n���������� �� ��� ��������� ������ �� �������� �� ������� ���� ������� �� ������������� �� ��������� �� ���������.<br /><br />\r\n��� ����� �������, ���� �� �� �������� � ��� �� ������� 0700 121 07.<br /><br />\r\n� ��������,<br />\r\n������ �� ��������� �� ���������.', True, 2, E'2018-05-18 07:46:14.271163+03', 2, E'2018-05-18 07:46:14.274082+03'),
  (8, E'���������� � �������� �� �� �� ������� ����� �� ������� {BULLETIN_PERIOD}', E'� ������� ������ �� ��������� �� ���������� ��������������� ������ �� ������� �� ����������� � ���������� ��� ������� �� ������� {BULLETIN_PERIOD}. ������ ������� � �������� �� <a href=\"{BULLETIN_FILE_LINK}\">���</a>.<br /><br />\r\n������ �� ���������� ������������ �� ����� ��������� �� ���� �������� � ����������, ���� ��������� ����������� �� �� �������������� �� ������ �� <a href=\"{USER_PROFILE_LINK}\">���</a>.<br /><br />\r\n*���� � ����������� ���������� ��������� �� ������� ������ �� ��������� �� ���������� ��������������� ������ �� ������� �� ���������.', True, 2, E'2018-12-14 11:22:18.336694+02', 2, E'2018-12-14 11:22:18.342359+02'),
  (9, E'����������� � ���������� �� {STATISTIC_NAME} �� {REGISTER_NAME} �� ������� {DATE_FROM} - {DATE_TO}', E'� ������� ������ �� ��������� �� ���������� ��������������� ������ �� ������� �� ����������� � ����������� ���� ������������� ���������� �� �������� - {REGISTER_NAME} �� ������� {DATE_FROM} - {DATE_TO}. ������ ���������� � �������� �� <a href=\"{STATISTIC_REPORT_URL}\">���</a>.<br />\r\n������ �� ���������� ������������ �� ����� ��������� �� ���� �������� � ����������, ���� ��������� ����������� �� �� �������������� �� ������ �� <a href=\"{USER_PROFILE_LINK}\">���</a>.<br /><br />\r\n*���� � ����������� ���������� ��������� �� ������� ������ �� ��������� �� ���������� ��������������� ������ �� ������� �� ���������.', True, 2, E'2019-01-31 13:49:03.71975+02', 2, E'2019-01-31 13:49:03.726248+02'),
  (6, E'������� �� ������ � ������� ���� ��������� �� ������', E'���������,<br /><br />\r\n������ ������ ���� ��������� �� �������� ��� �� ��.<br />\r\n�� �� ���������� �� �� ������������� ���� ������� �� ���� ������ �� ������ � ���������� �� � ���������, ���� ���������� ������� ��-���� ����:<br /><br />\r\n<a href=\"{ACTIVATION_LINK}\">{ACTIVATION_LINK}</a><br /><br />\r\n��� ��� ����� �� �����, ���������� �� �� �������, ���� ��������� ����� ��� ����� �������� �������. ��� ������� �� ���� ��������� �� {DEADLINE}, ������ �� ���� ����������� �����������. ���� �������� �� ���� ���� �� ������ �� � ���������, ���� ���������� ���������������� �� ��������� ������.<br /><br />\r\n���� ��������� � �����������, ���� �� �����������! ��� ����� ������������ �������, ���� �� �� �������� � ��� �� ������� 0700 121 07.<br /><br />\r\n� ��������,<br />\r\n������ �� ��������� �� ���������.', True, 2, E'2018-05-28 16:28:07.623993+03', 2, E'2018-05-28 16:28:07.6309+03'),
  (11, E'��������� ������� �� {DEED_NAME} � {REGISTER_NAME}', E'� {REGISTER_NAME} {EVENT_DATA}.<br /><br />\r\n*���� � ����������� ���������� ��������� �� ��������������� ������� �� {REGISTER_NAME} � ������� ������ �� ��������� �� ���������� ��������������� ������ �� ������� �� ���������.', True, 1, E'2018-05-09 16:16:28.78349+03', 1, E'2018-05-09 16:16:28.78349+03');