export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    role_preference: 'SM' | 'PO' | null
                    xp_points: number // legacy field, we are using total_xp now but keeping it for safety
                    total_xp: number
                    level: 'Apprendista' | 'Capo Reparto' | 'Value Stream Architect' | 'Master of Flow'
                    created_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    role_preference?: 'SM' | 'PO' | null
                    xp_points?: number
                    total_xp?: number
                    level?: 'Apprendista' | 'Capo Reparto' | 'Value Stream Architect' | 'Master of Flow'
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    role_preference?: 'SM' | 'PO' | null
                    xp_points?: number
                    total_xp?: number
                    level?: 'Apprendista' | 'Capo Reparto' | 'Value Stream Architect' | 'Master of Flow'
                    created_at?: string
                }
            }
            user_badges: {
                Row: {
                    id: string
                    user_id: string
                    badge_type: string
                    awarded_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    badge_type: string
                    awarded_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    badge_type?: string
                    awarded_at?: string
                }
            }
            scenarios: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    role_target: 'SM' | 'PO' | null
                    difficulty: 'Junior' | 'Mid' | 'Senior' | null
                    initial_context: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    role_target?: 'SM' | 'PO' | null
                    difficulty?: 'Junior' | 'Mid' | 'Senior' | null
                    initial_context?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    role_target?: 'SM' | 'PO' | null
                    difficulty?: 'Junior' | 'Mid' | 'Senior' | null
                    initial_context?: string | null
                    created_at?: string
                }
            }
            user_progress: {
                Row: {
                    id: string
                    user_id: string
                    module_id: string
                    theory_completed: boolean
                    quiz_passed: boolean
                    simulation_completed: boolean
                    current_step: 'theory' | 'quiz' | 'practice' | 'done' | null
                    updated_at: string
                    last_accessed_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    module_id: string
                    theory_completed?: boolean
                    quiz_passed?: boolean
                    simulation_completed?: boolean
                    current_step?: 'theory' | 'quiz' | 'practice' | 'done' | null
                    updated_at?: string
                    last_accessed_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    module_id?: string
                    theory_completed?: boolean
                    quiz_passed?: boolean
                    simulation_completed?: boolean
                    current_step?: 'theory' | 'quiz' | 'practice' | 'done' | null
                    updated_at?: string
                    last_accessed_at?: string | null
                }
            }
            user_attempts: {
                Row: {
                    id: string
                    user_id: string
                    scenario_id: string
                    score: number | null
                    ai_feedback: Json | null
                    chat_transcript: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    scenario_id: string
                    score?: number | null
                    ai_feedback?: Json | null
                    chat_transcript?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id: string
                    scenario_id: string
                    score?: number | null
                    ai_feedback?: Json | null
                    chat_transcript?: Json | null
                    created_at?: string
                }
            }
        }
    }
}
