export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Address: {
        Row: {
          censusBlock: string
          city: string
          id: number
          number: string
          state: string
          street: string
          type: string
          zipCode: string
        }
        Insert: {
          censusBlock: string
          city: string
          id?: number
          number: string
          state: string
          street: string
          type: string
          zipCode: string
        }
        Update: {
          censusBlock?: string
          city?: string
          id?: number
          number?: string
          state?: string
          street?: string
          type?: string
          zipCode?: string
        }
        Relationships: []
      }
      DisasterFormAnswer: {
        Row: {
          answer: string
          formQuestionId: number | null
          formResponseId: number | null
          id: number
        }
        Insert: {
          answer: string
          formQuestionId?: number | null
          formResponseId?: number | null
          id?: number
        }
        Update: {
          answer?: string
          formQuestionId?: number | null
          formResponseId?: number | null
          id?: number
        }
        Relationships: []
      }
      DisasterFormQuestion: {
        Row: {
          descriptionOne: string
          descriptionTwo: string
          eventId: number | null
          field: string
          id: number
          options: string[] | null
          questionType: number
          require: boolean
          sequence: number
          validation: string
        }
        Insert: {
          descriptionOne: string
          descriptionTwo: string
          eventId?: number | null
          field: string
          id?: number
          options?: string[] | null
          questionType: number
          require: boolean
          sequence: number
          validation: string
        }
        Update: {
          descriptionOne?: string
          descriptionTwo?: string
          eventId?: number | null
          field?: string
          id?: number
          options?: string[] | null
          questionType?: number
          require?: boolean
          sequence?: number
          validation?: string
        }
        Relationships: [
          {
            foreignKeyName: "DisasterFormQuestion_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
        ]
      }
      DisasterFormResponse: {
        Row: {
          eventOnAddressId: number | null
          id: number
          volunteerId: number | null
        }
        Insert: {
          eventOnAddressId?: number | null
          id?: number
          volunteerId?: number | null
        }
        Update: {
          eventOnAddressId?: number | null
          id?: number
          volunteerId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "DisasterFormResponse_eventOnAddressId_fkey"
            columns: ["eventOnAddressId"]
            isOneToOne: false
            referencedRelation: "EventsOnAddresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "DisasterFormResponse_volunteerId_fkey"
            columns: ["volunteerId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Event: {
        Row: {
          active: boolean
          createdAt: string
          creatorId: string
          description: string
          id: number
          severity: Database["public"]["Enums"]["severity"] | null
          startDate: string
          title: string
          updatedAt: string
        }
        Insert: {
          active?: boolean
          createdAt?: string
          creatorId: string
          description: string
          id?: number
          severity?: Database["public"]["Enums"]["severity"] | null
          startDate: string
          title: string
          updatedAt: string
        }
        Update: {
          active?: boolean
          createdAt?: string
          creatorId?: string
          description?: string
          id?: number
          severity?: Database["public"]["Enums"]["severity"] | null
          startDate?: string
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Event_creatorId_fkey"
            columns: ["creatorId"]
            isOneToOne: false
            referencedRelation: "User2"
            referencedColumns: ["id"]
          },
        ]
      }
      EventAddress: {
        Row: {
          blockId: string
          city: string
          claimerId: string | null
          createdAt: string
          eventId: number
          id: number
          number: string
          state: string
          street: string
          type: string
          zipCode: string
        }
        Insert: {
          blockId: string
          city: string
          claimerId?: string | null
          createdAt?: string
          eventId: number
          id?: number
          number: string
          state: string
          street: string
          type: string
          zipCode: string
        }
        Update: {
          blockId?: string
          city?: string
          claimerId?: string | null
          createdAt?: string
          eventId?: number
          id?: number
          number?: string
          state?: string
          street?: string
          type?: string
          zipCode?: string
        }
        Relationships: [
          {
            foreignKeyName: "EventAddress_claimerId_fkey"
            columns: ["claimerId"]
            isOneToOne: false
            referencedRelation: "User2"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EventAddress_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
        ]
      }
      EventsOnAddresses: {
        Row: {
          addressId: number | null
          assignedAt: string
          assignedBy: string
          eventId: number | null
          id: number
        }
        Insert: {
          addressId?: number | null
          assignedAt?: string
          assignedBy: string
          eventId?: number | null
          id?: number
        }
        Update: {
          addressId?: number | null
          assignedAt?: string
          assignedBy?: string
          eventId?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "EventsOnAddresses_addressId_fkey"
            columns: ["addressId"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EventsOnAddresses_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
        ]
      }
      EventVolunteer: {
        Row: {
          approved: boolean
          createdAt: string
          eventId: number
          id: number
          volunteerId: string
        }
        Insert: {
          approved?: boolean
          createdAt?: string
          eventId: number
          id?: number
          volunteerId: string
        }
        Update: {
          approved?: boolean
          createdAt?: string
          eventId?: number
          id?: number
          volunteerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "EventVolunteer_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "EventVolunteer_volunteerId_fkey"
            columns: ["volunteerId"]
            isOneToOne: false
            referencedRelation: "User2"
            referencedColumns: ["id"]
          },
        ]
      }
      Form: {
        Row: {
          ableToStayHome: boolean | null
          eventId: number | null
          floodWaterHeight: string | null
          id: number
          impacted: boolean | null
          needHelp: boolean | null
          primaryLanguage: string | null
          residentEmail: string | null
          residentName: string | null
          residentPhone: string | null
          roofDamaged: boolean | null
          userId: number | null
        }
        Insert: {
          ableToStayHome?: boolean | null
          eventId?: number | null
          floodWaterHeight?: string | null
          id?: number
          impacted?: boolean | null
          needHelp?: boolean | null
          primaryLanguage?: string | null
          residentEmail?: string | null
          residentName?: string | null
          residentPhone?: string | null
          roofDamaged?: boolean | null
          userId?: number | null
        }
        Update: {
          ableToStayHome?: boolean | null
          eventId?: number | null
          floodWaterHeight?: string | null
          id?: number
          impacted?: boolean | null
          needHelp?: boolean | null
          primaryLanguage?: string | null
          residentEmail?: string | null
          residentName?: string | null
          residentPhone?: string | null
          roofDamaged?: boolean | null
          userId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Form_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Form_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          address: string | null
          email: string
          id: number
          isAuth: boolean
          name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          address?: string | null
          email: string
          id?: number
          isAuth?: boolean
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          address?: string | null
          email?: string
          id?: number
          isAuth?: boolean
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
      User2: {
        Row: {
          address: string | null
          age: number | null
          email: string
          id: string
          languages: string | null
          name: string | null
          organizations: string | null
          phone: string | null
          pronouns: string | null
          role: Database["public"]["Enums"]["Role"] | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          email: string
          id?: string
          languages?: string | null
          name?: string | null
          organizations?: string | null
          phone?: string | null
          pronouns?: string | null
          role?: Database["public"]["Enums"]["Role"] | null
        }
        Update: {
          address?: string | null
          age?: number | null
          email?: string
          id?: string
          languages?: string | null
          name?: string | null
          organizations?: string | null
          phone?: string | null
          pronouns?: string | null
          role?: Database["public"]["Enums"]["Role"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Role: "USER" | "ADMIN" | "SUPERADMIN"
      severity: "Low" | "Moderate" | "Severe"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
