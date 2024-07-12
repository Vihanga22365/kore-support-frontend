import { Injectable } from '@angular/core';
import { Environment, InstallationType, MessageType, Product, Severity, Status, SupportRequestType } from '../model/enums.model';
import { EnvironmentEnum, InstallationTypeEnum, MessageTypeEnum, ProductEnum, SeverityEnum, StatusEnum, SupportRequestTypeEnum } from '../util/enums';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  constructor() {}

  getProduct(): Product[] {
    return [
      { id: 1, enumName: ProductEnum.KORE_AI_XO_PLATFORM, displayName: 'KORE AI XO Platform' },
      { id: 2, enumName: ProductEnum.SMART_ASSIST, displayName: 'Smart Assist' },
      { id: 3, enumName: ProductEnum.BANK_ASSIST, displayName: 'Bank Assist' },
      { id: 4, enumName: ProductEnum.HEALTH_ASSIST, displayName: 'Health Assist' },
      { id: 5, enumName: ProductEnum.HR_ASSIST, displayName: 'HR Assist' },
      { id: 6, enumName: ProductEnum.IT_ASSIST, displayName: 'IT Assist' },
      { id: 7, enumName: ProductEnum.SEARCH_ASSIST, displayName: 'Search Assist' },
      { id: 8, enumName: ProductEnum.AGENT_ASSIST_SMART_ASSIST, displayName: 'Agent Assist Smart Assist' },
      { id: 9, enumName: ProductEnum.WORK_ASSIST_NOT_SUPPORTED_YET, displayName: 'Work Assist Not Supported Yet' },
      { id: 10, enumName: ProductEnum.KORA, displayName: 'Kora' },
      { id: 11, enumName: ProductEnum.NONE, displayName: 'None' },
      { id: 12, enumName: ProductEnum.AGENT_DESKTOP_DEPRECATED_USE_SMART_ASSIST, displayName: 'Agent Desktop Deprecated Use Smart Assist' },
      { id: 13, enumName: ProductEnum.GALE, displayName: 'Gale' },
    ];
  }

  getEnvironment(): Environment[] {
    return [
      { id: 1, enumName: EnvironmentEnum.NO_AFFECTED_ENVIRONMENT, displayName: 'No Affected Environment' },
      { id: 2, enumName: EnvironmentEnum.NON_PROD_US_SAAS, displayName: 'Non Prod US SAAS' },
      { id: 3, enumName: EnvironmentEnum.NON_PROD_AU_SAAS, displayName: 'Non Prod AU SAAS' },
      { id: 4, enumName: EnvironmentEnum.NON_PROD_DE_SAAS, displayName: 'Non Prod DE SAAS' },
      { id: 5, enumName: EnvironmentEnum.NON_PROD_EU_SAAS, displayName: 'Non Prod EU SAAS' },
      { id: 6, enumName: EnvironmentEnum.NON_PROD_JP_SAAS, displayName: 'Non Prod JP SAAS' },
      { id: 7, enumName: EnvironmentEnum.NON_PROD_IND_SAAS, displayName: 'Non Prod IND SAAS' },
      { id: 8, enumName: EnvironmentEnum.NON_PROD_ON_PREMISE_PRIVATE_SAAS, displayName: 'Non Prod On Premise Private SAAS' },
      { id: 9, enumName: EnvironmentEnum.PROD_US_SAAS, displayName: 'Prod US SAAS' },
      { id: 10, enumName: EnvironmentEnum.PROD_AU_SAAS, displayName: 'Prod AU SAAS' },
      { id: 11, enumName: EnvironmentEnum.PROD_DE_SAAS, displayName: 'Prod DE SAAS' },
      { id: 12, enumName: EnvironmentEnum.PROD_EU_SAAS, displayName: 'Prod EU SAAS' },
      { id: 13, enumName: EnvironmentEnum.PROD_JP_SAAS, displayName: 'Prod JP SAAS' },
      { id: 14, enumName: EnvironmentEnum.PROD_IND_SAAS, displayName: 'Prod IND SAAS' },
      { id: 15, enumName: EnvironmentEnum.PROD_ON_PREMISE_PRIVATE_SAAS, displayName: 'Prod On Premise Private SAAS' },
    ];
  }

  getSeverity(): Severity[] {
    return [
      { id: 1, enumName: SeverityEnum.SEVERITY_1, displayName: 'Severity 1' },
      { id: 2, enumName: SeverityEnum.SEVERITY_2, displayName: 'Severity 2' },
      { id: 3, enumName: SeverityEnum.SEVERITY_3, displayName: 'Severity 3' },
      { id: 4, enumName: SeverityEnum.SEVERITY_4, displayName: 'Severity 4' },
    ];
  }

  getInstallationType(): InstallationType[] {
    return [
      { id: 1, enumName: InstallationTypeEnum.ON_PREMISE, displayName: 'On Premise' },
      { id: 2, enumName: InstallationTypeEnum.SAAS_MULTI_TENANT, displayName: 'SAAS Multi Tenant' },
      { id: 3, enumName: InstallationTypeEnum.SAAS_PRIVATE, displayName: 'SAAS Private' },
    ];
  }

  getSupportRequestType(): SupportRequestType[] {
    return [
      { id: 1, enumName: SupportRequestTypeEnum.INCIDENT, displayName: 'Incident' },
      { id: 2, enumName: SupportRequestTypeEnum.QUESTION, displayName: 'Question' },
      { id: 3, enumName: SupportRequestTypeEnum.SERVICE_REQUEST, displayName: 'Service Request' },
      { id: 4, enumName: SupportRequestTypeEnum.ROOT_CAUSE_ANALYSIS, displayName: 'Root Cause Analysis' },
      { id: 5, enumName: SupportRequestTypeEnum.ENHANCEMENT, displayName: 'Enhancement' },
      { id: 6, enumName: SupportRequestTypeEnum.PROVISIONING, displayName: 'Provisioning' },
      { id: 7, enumName: SupportRequestTypeEnum.REPORTED_VULNERABILITY, displayName: 'Reported Vulnerability' },
    ];
  }

  getStatus(): Status[] {
    return [
      { id: 1, enumName: StatusEnum.AWAITING_REPLY, displayName: 'Awaiting' },
      { id: 2, enumName: StatusEnum.SOLVED, displayName: 'Solved' },
      { id: 3, enumName: StatusEnum.CLOSED, displayName: 'Closed' },
      { id: 4, enumName: StatusEnum.OPEN, displayName: 'Open' },
    ];
  }

  getMessageType(): MessageType[] {
    return [
      { id: 1, enumName: MessageTypeEnum.CLIENT, displayName: 'Client' },
      { id: 2, enumName: MessageTypeEnum.VENDOR, displayName: 'Vendor' },
    ];
  }

  getUserRoles(): any[] {
    return [
      { id: 1, enumName: 'ADMIN', displayName: 'Admin' },
      { id: 2, enumName: 'LEVEL-1', displayName: 'Level-1' },
      { id: 3, enumName: 'LEVEL-2', displayName: 'Level-2' },
      { id: 4, enumName: 'LEVEL-3', displayName: 'Level-3' },
      { id: 5, enumName: 'LEVEL-4', displayName: 'Level-4' },
    ];
  }
}
