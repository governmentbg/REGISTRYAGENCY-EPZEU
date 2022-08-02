GRANT EXECUTE ON dbms_aq TO EPZEU_QUEUES_DEV; 
GRANT EXECUTE ON dbms_aqadm TO EPZEU_QUEUES_DEV;
GRANT EXECUTE ON DBMS_AQIN TO EPZEU_QUEUES_DEV;
GRANT EXECUTE ON DBMS_AQJMS TO EPZEU_QUEUES_DEV;


CREATE OR REPLACE TYPE REBUS_MSG_HEADER AS OBJECT (
                                           KEY VARCHAR2(4000),
                                           VALUE VARCHAR2(4000)
                                        );

CREATE OR REPLACE TYPE REBUS_MSG_HEADERS IS VARRAY(100) OF REBUS_MSG_HEADER NOT NULL;
                    
create or replace type REBUS_MESSAGE_V2 as object
                                                (
                                                      HEADERS         REBUS_MSG_HEADERS,                                           
                                                      BODY_RAW        RAW(2000),
                                                      BODY_BLOB       BLOB,
                                                      MEMBER FUNCTION ContainsHeader(p_header_key VARCHAR2) RETURN NUMBER,
                                                      MEMBER FUNCTION GetHeaderValue(p_header_key VARCHAR2)RETURN VARCHAR2
                                                );   

create or replace type body REBUS_MESSAGE_V2 is
  
                                                  -- Member procedures and functions
                                                  MEMBER FUNCTION ContainsHeader(p_header_key VARCHAR2) RETURN NUMBER
                                                  IS
                                                  BEGIN
                                                    FOR i IN 1..HEADERS.Count LOOP
                                                      BEGIN
                                                        IF HEADERS(i).KEY = p_header_key
                                                        THEN
                                                          RETURN 1;
                                                        END IF;
                                                      END;
                                                    END LOOP;
         
                                                    RETURN 0;
                                                  END; 
  
                                                  MEMBER FUNCTION GetHeaderValue(p_header_key VARCHAR2)RETURN VARCHAR2
                                                  IS        
                                                  BEGIN
    
                                                    FOR i IN 1..HEADERS.Count LOOP
                                                      BEGIN
                                                        IF HEADERS(i).KEY = p_header_key
                                                        THEN
                                                          RETURN HEADERS(i).VALUE;
                                                        END IF;
                                                      END;
                                                    END LOOP;
        
                                                    RETURN NULL;
                                                  END; 
  
                                                end;
                    

                    
begin
	-- EPZEU QUEUE
    sys.dbms_aqadm.create_queue_table(queue_table => 'QT_EPZEU_API',
                                    queue_payload_type => 'REBUS_MESSAGE_V2', 
                                    primary_instance => 1);
                
    sys.dbms_aqadm.create_queue(queue_name => 'Q_EPZEU_API',
                                queue_table => 'QT_EPZEU_API',
                                max_retries => 10, 
                                retry_delay => 5);

    sys.dbms_aqadm.start_queue(queue_name => 'Q_EPZEU_API');

	--CR PORTAL
    sys.dbms_aqadm.create_queue_table(queue_table => 'QT_CR_PORTAL',
                                    queue_payload_type => 'REBUS_MESSAGE_V2', 
                                    primary_instance => 1);
                
    sys.dbms_aqadm.create_queue(queue_name => 'Q_CR_PORTAL',
                                queue_table => 'QT_CR_PORTAL',
                                max_retries => 10, 
                                retry_delay => 5);

    sys.dbms_aqadm.start_queue(queue_name => 'Q_CR_PORTAL');

    --PR PORTAL
    sys.dbms_aqadm.create_queue_table(queue_table => 'QT_PR_PORTAL',
                                    queue_payload_type => 'SYS.AQ$_JMS_OBJECT_MESSAGE',
                                    primary_instance => 1);

    sys.dbms_aqadm.create_queue(queue_name => 'Q_PR_PORTAL',
                                queue_table => 'QT_PR_PORTAL',
                                max_retries => 10,
                                retry_delay => 5);

    sys.dbms_aqadm.start_queue(queue_name => 'Q_PR_PORTAL');
end;