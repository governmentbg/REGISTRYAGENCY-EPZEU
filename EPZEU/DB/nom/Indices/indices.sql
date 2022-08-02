-- Definition for index n_d_document_templates_doc_templ_ver_id_is_last_idx (OID = 19533) : 
--
CREATE UNIQUE INDEX n_d_document_templates_doc_templ_ver_id_is_last_idx ON d_document_templates USING btree (doc_template_id) WHERE (is_last = (1)::bit(1));
--
-- Definition for index n_d_document_templates_document_type_id_is_last_idx (OID = 19534) : 
--
CREATE UNIQUE INDEX n_d_document_templates_document_type_id_is_last_idx ON d_document_templates USING btree (document_type_id) WHERE (is_last = (1)::bit(1));
--
-- Definition for index s_application_types_i18n_unique_idx (OID = 98774) : 
--
CREATE UNIQUE INDEX s_application_types_i18n_unique_idx ON s_application_types_i18n USING btree (id, language_id);
--
-- Definition for index n_d_document_types_pkey (OID = 19515) : 
--
ALTER TABLE ONLY d_document_types
    ADD CONSTRAINT n_d_document_types_pkey
    PRIMARY KEY (document_type_id);
	
-- Definition for index n_s_document_template_fields_pkey (OID = 19538) : 
--
ALTER TABLE ONLY s_document_template_fields
    ADD CONSTRAINT n_s_document_template_fields_pkey
    PRIMARY KEY (key);
--
-- Definition for index d_document_templates_pkey (OID = 19589) : 
--
ALTER TABLE ONLY d_document_templates
    ADD CONSTRAINT d_document_templates_pkey
    PRIMARY KEY (doc_template_id, doc_template_ver_id);
--
-- Definition for index d_labels_pkey (OID = 91358) : 
--
ALTER TABLE ONLY d_labels
    ADD CONSTRAINT d_labels_pkey
    PRIMARY KEY (label_id, label_ver_id);
--
-- Definition for index d_languages_pkey (OID = 91376) : 
--
ALTER TABLE ONLY d_languages
    ADD CONSTRAINT d_languages_pkey
    PRIMARY KEY (language_id);
--
-- Definition for index d_labels_i18n_pkey (OID = 91388) : 
--
ALTER TABLE ONLY d_labels_i18n
    ADD CONSTRAINT d_labels_i18n_pkey
    PRIMARY KEY (label_id, language_id);
--
-- Definition for index s_service_types_pkey (OID = 98740) : 
--
ALTER TABLE ONLY s_service_types
    ADD CONSTRAINT s_service_types_pkey
    PRIMARY KEY (service_type_id);
--
-- Definition for index s_application_types_pkey (OID = 98766) : 
--
ALTER TABLE ONLY s_application_types
    ADD CONSTRAINT s_application_types_pkey
    PRIMARY KEY (id);
-- Definition for index d_services_pkey (OID = 98820) : 
--
ALTER TABLE ONLY d_services
    ADD CONSTRAINT d_services_pkey
    PRIMARY KEY (service_id);
--
-- Definition for index s_registers_pkey (OID = 98952) : 
--
ALTER TABLE ONLY s_registers
    ADD CONSTRAINT s_registers_pkey
    PRIMARY KEY (register_id);
-- Definition for index d_iisda_services_pkey (OID = 99343) : 
--
ALTER TABLE ONLY d_iisda_services
    ADD CONSTRAINT d_iisda_services_pkey
    PRIMARY KEY (service_id);
--
-- Definition for index d_iisda_services_i18n_pkey (OID = 99364) : 
--
ALTER TABLE ONLY d_iisda_services_i18n
    ADD CONSTRAINT d_iisda_services_i18n_pkey
    PRIMARY KEY (service_id);
--