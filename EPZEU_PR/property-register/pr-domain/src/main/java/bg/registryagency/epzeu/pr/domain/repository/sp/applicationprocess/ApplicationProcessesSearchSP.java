package bg.registryagency.epzeu.pr.domain.repository.sp.applicationprocess;

import bg.registryagency.epzeu.pr.domain.model.*;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationDocumentMapper;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationMapper;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationProcessContentMapper;
import bg.registryagency.epzeu.pr.domain.repository.mapper.ApplicationProcessMapper;
import bg.registryagency.epzeu.pr.domain.repository.sp.SchemaEnum;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.core.convert.support.GenericConversionService;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.util.CollectionUtils;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ApplicationProcessesSearchSP extends StoredProcedure {
    private static final String SP_NAME = SchemaEnum.AP + ".f_application_processes_search";
    private static final String OUTPUT_COUNT = "p_count";
    private static final String REF_APPLICATION_PROCESSES = "ref_application_processes";
    private static final String REF_APPLICATION = "ref_application";
    private static final String REF_APPLICATION_DOCUMENTS = "ref_application_documents";
    private static final String REF_APPLICATION_CONTENTS = "ref_application_contents";

    public ApplicationProcessesSearchSP(DataSource dataSource) {
        super(dataSource, SP_NAME);

        //declaring sql out parameters
        declareParameter(new SqlOutParameter(OUTPUT_COUNT, Types.INTEGER));
        declareParameter(new SqlOutParameter(REF_APPLICATION_PROCESSES, Types.REF_CURSOR, new ApplicationProcessMapper(ApplicationProcess.class)));
        declareParameter(new SqlOutParameter(REF_APPLICATION, Types.REF_CURSOR, new ApplicationMapper(Application.class)));
        declareParameter(new SqlOutParameter(REF_APPLICATION_DOCUMENTS, Types.REF_CURSOR, new ApplicationDocumentMapper(ApplicationDocument.class)));
        declareParameter(new SqlOutParameter(REF_APPLICATION_CONTENTS, Types.REF_CURSOR, new ApplicationProcessContentMapper((ApplicationProcessContent.class))));

        //declaring sql in parameters
        declareParameter(new SqlParameter("p_application_process_id", Types.BIGINT));
        declareParameter(new SqlParameter("p_applicant_cin", Types.INTEGER));
        declareParameter(new SqlParameter("p_main_application_type_id", Types.SMALLINT));
        declareParameter(new SqlParameter("p_load_applications", Types.BOOLEAN));
        declareParameter(new SqlParameter("p_load_application_documents", Types.BOOLEAN));
        declareParameter(new SqlParameter("p_load_application_contents", Types.BOOLEAN));
        declareParameter(new SqlParameter("p_start_index", Types.INTEGER));
        declareParameter(new SqlParameter("p_page_size", Types.INTEGER));
        declareParameter(new SqlParameter("p_calculate_count", Types.BOOLEAN));
        declareParameter(new SqlParameter("p_max_nor", Types.INTEGER));
        declareParameter(new SqlParameter("p_signing_giud", Types.OTHER));

        compile();
    }

    public Result<ApplicationProcess> execute(SearchCriteria.ApplicationProcessSearchCriteria applicationProcessSearchCriteria) {
        Map<String, Object> inParams = new HashMap<>(11);
        inParams.put("p_signing_giud", applicationProcessSearchCriteria.getSigningGuid());
        inParams.put("p_application_process_id", applicationProcessSearchCriteria.getApplicationProcessId());
        inParams.put("p_applicant_cin", applicationProcessSearchCriteria.getApplicantCin());
        inParams.put("p_main_application_type_id", applicationProcessSearchCriteria.getMainApplicationType() != null
            ? applicationProcessSearchCriteria.getMainApplicationType().getCode() : null);
        inParams.put("p_load_applications", applicationProcessSearchCriteria.isLoadApplications());
        inParams.put("p_load_application_documents", applicationProcessSearchCriteria.isLoadApplicationDocuments());
        inParams.put("p_load_application_contents", applicationProcessSearchCriteria.isLoadApplicationContents());
        inParams.put("p_start_index", applicationProcessSearchCriteria.getStartIndex());
        inParams.put("p_page_size", applicationProcessSearchCriteria.getPageSize());
        inParams.put("p_calculate_count", applicationProcessSearchCriteria.isCalculateCount());
        inParams.put("p_max_nor", applicationProcessSearchCriteria.getMaxNumberOfRecords());

        Map<String, Object> result = super.execute(inParams);
        List<ApplicationProcess> applicationProcesses = (List<ApplicationProcess>) result.get(REF_APPLICATION_PROCESSES);

        if(!CollectionUtils.isEmpty(applicationProcesses)) {
            List<Application> applications = new ArrayList<>();
            List<ApplicationDocument> applicationDocuments = new ArrayList<>();
            List<ApplicationProcessContent> applicationProcessContents = new ArrayList<>();

            if (applicationProcessSearchCriteria.isLoadApplications()) {
                applications = (List<Application>) result.get(REF_APPLICATION);
            }
            if (applicationProcessSearchCriteria.isLoadApplicationDocuments()) {
                applicationDocuments = (List<ApplicationDocument>) result.get(REF_APPLICATION_DOCUMENTS);
            }
            if (applicationProcessSearchCriteria.isLoadApplicationContents()) {
                applicationProcessContents = (List<ApplicationProcessContent>) result.get(REF_APPLICATION_CONTENTS);
            }
            //If all collections are empty skip mapping
            if(!applications.isEmpty() || !applicationDocuments.isEmpty() || !applicationProcessContents.isEmpty()) {
                //Enumerate Application Processes and Applications to map them
                for (ApplicationProcess applicationProcess : applicationProcesses) {
                    for (Application application : applications) {
                        //If application process ids match between ApplicationProcess and Application then map objects
                        if(applicationProcess.getApplicationProcessId().equals(application.getApplicationProcess().getApplicationProcessId())) {
                            applicationProcess.addApplication(application);
                            if(applicationProcess.getMainApplication().getApplicationId().equals(application.getApplicationId())) {
                                applicationProcess.setMainApplication(application);
                            }
                        }
                        //These case is possible if loadApplications = true and loadApplicationDocuments = true
                        //then map returned Application Documents(ref_application_documents) with returned Applications(ref_application)
                        if(applicationProcessSearchCriteria.isLoadApplicationDocuments()) {
                            List<ApplicationDocument> matchedApplicationDocuments = applicationDocuments.stream()
                                .filter(document -> document.getApplication().getApplicationId().equals(application.getApplicationId()))
                                .collect(Collectors.toList());

                            application.addApplicationDocuments(matchedApplicationDocuments);
                        }
                    }

                    for (ApplicationProcessContent applicationProcessContent : applicationProcessContents) {
                        if(applicationProcess.getApplicationProcessId().equals(applicationProcessContent.getApplicationProcess().getApplicationProcessId())) {
                            applicationProcess.addApplicationProcessContent(applicationProcessContent);
                        }
                    }

                    //If loading Application Processes with Application Documents without Applications(loadApplications = false, loadApplicationDocuments = true)
                    //then Application Documents comes with applicationId from db, group Documents by ApplicationId, create Applications and add these Applications in
                    //Application Process
                    if(!applicationProcessSearchCriteria.isLoadApplications() && applicationProcessSearchCriteria.isLoadApplicationDocuments()) {
                        throw new UnsupportedOperationException("Application Process search with these criteria is not currently supported");
                    }
                }
            }
        }

        Integer count = null;
        if(applicationProcessSearchCriteria.isCalculateCount()) {
            Integer countOfObjectsForQuery = (Integer) result.get("p_count");
            if (countOfObjectsForQuery != null) {
                count = countOfObjectsForQuery;
            }
        }

        return new Result<>(count, applicationProcesses);
    }
}
