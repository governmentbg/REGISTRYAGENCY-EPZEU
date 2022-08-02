/* ����� ������ �� ������� ������ ������ �� nom.d_labels_import_tmp;*/
/*���� ��� �� �� ��������� ������ � �������, ������ �� ������ ������ ������� ��
�������� �������! ����� ����� �� nom.d_labels_import_tmp, ����� ������ �� importnem,
����� � ������� ��-���� � ����� ���������� ���� �� �������.*/
/* delete from nom.d_labels_import_tmp;*/
/* ���� ���� import-���� - ����� ����� �� nom.d_labels_import_tmp -> Data Manipulation -> Import Data*/

--�������� ����������� �������� �������� � blank space ������, ����� ������ �� �� ��������
 update nom.d_labels_import_tmp label
 set
 	code = trim(both ' ' from label.code);

-- import tool-a ����� ��������� ����� ���� ���������. ��� � ������:
update nom.d_labels_import_tmp
set
    value = replace(value, '\"', '"'),
    description = replace(description, '\"', '"');

-- import tool-a ����� \r\n �� ��� ���. ��� �� ������:
update nom.d_labels_import_tmp
set
    value = replace(value, '\r\n', ''),
    description = replace(description, '\r\n', '');


 -- import tool-a ����� ��������� ����� ���� ���������. ��� � ������:
update nom.d_labels_import_tmp
set
    value_en = replace(value_en, '\"', '"'),
    description_en = replace(description_en, '\"', '"');


-- import tool-a ����� \r\n �� ��� ���. ��� �� ������:
update nom.d_labels_import_tmp
set
    value_en = replace(value_en, '\r\n', ''),
    description_en = replace(description_en, '\r\n', '');


-- ��� � access-���� ���� �� ���������� ������, ������ �� �� ��������� � �� labels � labels_i18n:
DELETE from nom.d_labels_i18n translation
WHERE translation.label_id = ANY(
	SELECT label.label_id FROM nom.d_labels label
	WHERE label.is_last = 1::bit AND (label.code != ALL(SELECT tmp.code FROM nom.d_labels_import_tmp tmp)) OR ((select tmp.value_en from nom.d_labels_import_tmp tmp where tmp.code = label.code) is null)
);

DELETE from nom.d_labels
WHERE label_id = ANY(
	SELECT label.label_id FROM nom.d_labels label
	WHERE label.code != ALL(SELECT tmp.code FROM nom.d_labels_import_tmp tmp)
);


-- update labels from labels_tmp_import
update nom.d_labels label
set
    value = (select tmp.value from nom.d_labels_import_tmp tmp where tmp.code = label.code ),
    description = (select tmp.description from nom.d_labels_import_tmp tmp where tmp.code = label.code)
where label.is_last = 1::bit;


-- insert-���� ���� ������ �� labels_tmp_import, ����� ��� ��� �� ����������� � labels
insert into nom.d_labels (
	  label_ver_id,
      code,
      value,
	  description,
      created_by,
      created_on,
      updated_by,
      updated_on,
      is_last
)Select
	1,
    tmp.code,
    tmp.value,
    tmp.description,
    1,
    sys.f_current_timestamp(),
    1,
    sys.f_current_timestamp(),
    1::bit
 from nom.d_labels_import_tmp tmp
 where EXISTS(select label.label_id from nom.d_labels label where label.code = tmp.code) = false;



--select * from nom.d_labels lbls where lbls.is_last = 1::bit;


-- update labels from labels_tmp_import
update nom.d_labels_i18n label_i18
set
    value = (select tmp.value_en from nom.d_labels_import_tmp tmp where tmp.code = (select label.code from nom.d_labels label where label.label_id = label_i18.label_id and label.is_last = 1::bit)),
    description = (select tmp.description_en from nom.d_labels_import_tmp tmp where tmp.code = (select label.code from nom.d_labels label where label.label_id = label_i18.label_id and label.is_last = 1::bit)),
	label_ver_id = (select label.label_ver_id from nom.d_labels label where label.label_id = label_i18.label_id and label.is_last = 1::bit);


   -- insert-���� ���� ������ �� labels_tmp_import, ����� ��� ��� �� ����������� � labels
insert into nom.d_labels_i18n (
	  label_id,
	  label_ver_id,
      language_id,
      value,
	  description,
      created_by,
      created_on,
      updated_by,
      updated_on
)Select
	(select label.label_id  from nom.d_labels label where label.code = tmp.code and label.is_last = 1::bit),
	(select label.label_ver_id  from nom.d_labels label where label.code = tmp.code and label.is_last = 1::bit),
    117,
    tmp.value_en,
    tmp.description_en,
    1,
    sys.f_current_timestamp(),
    1,
    sys.f_current_timestamp()
 from nom.d_labels_import_tmp tmp
where tmp.description_en is not null
 	and (Exists(select label_i18.label_id
    	from nom.d_labels_i18n label_i18
        where label_i18.language_id=117 and label_i18.label_id= (select label.label_id  from nom.d_labels label where label.code = tmp.code and label.is_last = 1::bit))= false);



